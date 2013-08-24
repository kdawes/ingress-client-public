#ifndef DEFS_HPP
#define	DEFS_HPP

typedef unsigned long long int quint64;

struct PointF {
public:

	PointF(float x, float y) : m_x(x), m_y(y) {}

	float x() {
		return m_x;
	}

	float y() {
		return m_y;
	}

private:
	float m_x;
	float m_y;
};

struct Vector3D {
public:

	Vector3D(float x, float y, float z) : m_x(x), m_y(y), m_z(z) {}

	float x() {
		return m_x;
	}

	float y() {
		return m_y;
	}

	float z() {
		return m_z;
	}

private:
	float m_x;
	float m_y;
	float m_z;
};

#endif
