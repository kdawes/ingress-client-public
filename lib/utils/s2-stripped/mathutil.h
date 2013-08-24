#ifndef MATHUTIL_H
#define MATHUTIL_H


static const double PI = 3.1415926535897932384626433832795;
static const float PIF = 3.1415926535897932384626433832795f;


inline static float Deg2Rad(float fV) {
	return (fV * PIF) / 180.0f;
}

inline static double Deg2Rad(double fV) {
	return (fV * PI) / 180.0;
}

inline static float Rad2Deg(float fV) {
	return (fV / PIF)*180.0f;
}

inline static double Rad2Deg(double fV) {
	return (fV / PI)*180.0;
}

static float drem(float a, float b) {
	return (a - int(a / b) * b);
}


#endif // MATHUTIL_H