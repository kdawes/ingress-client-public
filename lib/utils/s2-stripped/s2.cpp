#include "s2.h"

#include <math.h>
#include <algorithm>
#include <sstream>

namespace S2 {

	void InitLookupCell(int level, int i, int j, int orig_orientation,
			int pos, int orientation) {
		if (level == kLookupBits) {
			int ij = (i << kLookupBits) + j;
			lookup_pos[(ij << 2) + orig_orientation] = (pos << 2) + orientation;
			lookup_ij[(pos << 2) + orig_orientation] = (ij << 2) + orientation;
		} else {
			level++;
			i <<= 1;
			j <<= 1;
			pos <<= 2;
			int const* r = S2::kPosToIJ[orientation];
			InitLookupCell(level, i + (r[0] >> 1), j + (r[0] & 1), orig_orientation,
					pos, orientation ^ S2::kPosToOrientation[0]);
			InitLookupCell(level, i + (r[1] >> 1), j + (r[1] & 1), orig_orientation,
					pos + 1, orientation ^ S2::kPosToOrientation[1]);
			InitLookupCell(level, i + (r[2] >> 1), j + (r[2] & 1), orig_orientation,
					pos + 2, orientation ^ S2::kPosToOrientation[2]);
			InitLookupCell(level, i + (r[3] >> 1), j + (r[3] & 1), orig_orientation,
					pos + 3, orientation ^ S2::kPosToOrientation[3]);
		}
	}

	static void Init() {
		InitLookupCell(0, 0, 0, 0, 0, 0);
		InitLookupCell(0, 0, 0, kSwapMask, 0, kSwapMask);
		InitLookupCell(0, 0, 0, kInvertMask, 0, kInvertMask);
		InitLookupCell(0, 0, 0, kSwapMask | kInvertMask, 0, kSwapMask | kInvertMask);
	}

	static void MaybeInit() {
		static bool bInit = false;
		if (!bInit) {
			Init();
			bInit = true;
		};
	}

	quint64 FromFaceIJ(int face, int i, int j) {
		MaybeInit();
		unsigned int n[2] = {0, face << (kPosBits - 33)};

		// Alternating faces have opposite Hilbert curve orientations; this
		// is necessary in order for all faces to have a right-handed
		// coordinate system.
		int bits = (face & kSwapMask);

		// Each iteration maps 4 bits of "i" and "j" into 8 bits of the Hilbert
		// curve position.  The lookup table transforms a 10-bit key of the form
		// "iiiijjjjoo" to a 10-bit value of the form "ppppppppoo", where the
		// letters [ijpo] denote bits of "i", "j", Hilbert curve position, and
		// Hilbert curve orientation respectively.
#define GET_BITS(k) do { \
		int const mask = (1 << kLookupBits) - 1; \
		bits += ((i >> (k * kLookupBits)) & mask) << (kLookupBits + 2); \
		bits += ((j >> (k * kLookupBits)) & mask) << 2; \
		bits = lookup_pos[bits]; \
		n[k >> 2] |= (bits >> 2) << ((k & 3) * 2 * kLookupBits); \
		bits &= (kSwapMask | kInvertMask); \
	} \
	while (0)

		GET_BITS(7);
		GET_BITS(6);
		GET_BITS(5);
		GET_BITS(4);
		GET_BITS(3);
		GET_BITS(2);
		GET_BITS(1);
		GET_BITS(0);
#undef GET_BITS

		return (((static_cast<quint64> (n[1]) << 32) + n[0]) * 2 + 1);
	}

	static double UVtoST(double u) {
		if (u >= 0) {
			return sqrt(1 + 3 * u) - 1;
		} else {
			return 1 - sqrt(1 - 3 * u);
		};
		//return 0.5 * (u + 1);
	}

	static int STtoIJ(double s) {
		int m = kMaxSize / 2; // scaling multiplier
		return std::max(0, std::min(int(2 * m - 1), int((m * s + (m - 0.5)) + 0.5)));
		//return Max(0, Min(kMaxSize - 1, (int)(kMaxSize * s - 0.5)));
	}

	quint64 PosToCellID(PointF *p_xPos) {
		double theta = Deg2Rad(p_xPos->x());
		double phi = Deg2Rad(p_xPos->y());
		double cosphi = cos(phi);

		//topoint
		double dX = cos(theta) * cosphi;
		double dY = sin(theta) * cosphi;
		double dZ = sin(phi);

		int face = 0;
		if (abs(dY) > abs(dX) && abs(dY) > abs(dZ)) {
			face = 1;
		};
		if (abs(dZ) > abs(dX) && abs(dZ) > abs(dY)) {
			face = 2;
		};
		if (face == 0 && dX < 0) {
			face += 3;
		};
		if (face == 1 && dY < 0) {
			face += 3;
		};
		if (face == 2 && dZ < 0) {
			face += 3;
		};

		double pu;
		double pv;
		switch (face) {
			case 0:
				pu = dY / dX;
				pv = dZ / dX;
				break;
			case 1:
				pu = -dX / dY;
				pv = dZ / dY;
				break;
			case 2:
				pu = -dX / dZ;
				pv = -dY / dZ;
				break;
			case 3:
				pu = dZ / dX;
				pv = dY / dX;
				break;
			case 4:
				pu = dZ / dY;
				pv = -dX / dY;
				break;
			default:
				pu = -dY / dZ;
				pv = -dX / dZ;
				break;
		}

		int i = STtoIJ(UVtoST(pu));
		int j = STtoIJ(UVtoST(pv));

		return FromFaceIJ(face, i, j);
	}

	static quint64 CellIDLsb(quint64 id) {
		return (quint64) id & - (quint64) id;
	}

	static int CellIDFace(quint64 id) {
		return (int) ((quint64) id >> kPosBits);
	}

	static quint64 lsbForLevel(int level) {
		return 1ull << (quint64) (2 * (kMaxLevel - level));
	}

	static double stToUV(double s) {
		if (s >= 0.5) {
			return (1 / 3.) * (4 * s * s - 1);
		}
		return (1 / 3.) * (1 - 4 * (1 - s)*(1 - s));
	}

	static Vector3D faceUVToXYZ(int face, double u, double v) {
		switch (face) {
			case 0:
				return Vector3D(1, u, v);
			case 1:
				return Vector3D(-u, 1, v);
			case 2:
				return Vector3D(-u, -v, 1);
			case 3:
				return Vector3D(-1, -v, -u);
			case 4:
				return Vector3D(v, -1, -u);
			case 5:
				return Vector3D(v, u, -1);
		}
		return Vector3D(0, 0, 0);
	}

	PointF* CellIDToPos(quint64 id) {
		MaybeInit();
		int face = CellIDFace(id);
		int bits = face & kSwapMask;
		int nbits = kMaxLevel - 7 * kLookupBits; // first iteration
		int i = 0;
		int j = 0;

		for (int k = 7; k >= 0; k--) {
			bits += (int(quint64(id) >> quint64(k * 2 * kLookupBits + 1)) & ((1 << uint((2 * nbits))) - 1)) << 2;
			bits = lookup_ij[bits];
			i += (bits >> (kLookupBits + 2)) << uint(k * kLookupBits);
			j += ((bits >> 2) & ((1 << kLookupBits) - 1)) << uint(k * kLookupBits);
			bits &= (kSwapMask | kInvertMask);
			nbits = kLookupBits; // following iterations
		}

		if (CellIDLsb(id)&0x1111111111111110 != 0) {
			bits ^= kSwapMask;
		};


		int delta = 0;
		if (CellIDIsLeaf(id)) {
			delta = 1;
		} else {
			if ((i^(int(id) >> 2))&1 != 0) {
				delta = 2;
			}
		};

		int si = 2 * i + delta;
		int ti = 2 * j + delta;

		double pu = stToUV((0.5 / kMaxSize) * double(si));
		double pv = stToUV((0.5 / kMaxSize) * double(ti));
		Vector3D p = faceUVToXYZ(face, pu, pv);

		double dLat = Rad2Deg(atan2(p.z(), sqrt(p.x() * p.x() + p.y() * p.y())));
		double dLon = Rad2Deg(atan2(p.y(), p.x()));

		return new PointF(dLon, dLat);
	}

	bool CellIDIsLeaf(quint64 id) {
		return (id)&1 != 0;
	}


	quint64 CellIDParent(quint64 id, int level) {
		quint64 lsb = lsbForLevel(level);
		return quint64((quint64(id) & (-lsb)) | lsb);
	}

} //namespace S2