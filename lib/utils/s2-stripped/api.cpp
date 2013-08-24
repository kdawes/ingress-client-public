#include <iostream>
#include <set>
#include <string>
#include <vector>
#include <sstream>
#include <map>

#include "s2.h"

namespace S2 {

	std::string convertStringVectorToSingleString(std::vector<std::string> input) {
		std::stringstream string;
		for (std::vector<std::string>::iterator it = input.begin(); it != input.end(); ++it) {
			string << *it << "\n";
		}

		std::string test = string.str();

		return string.str();
	}

	std::string convertIntVectorToSingleString(std::vector<int> input) {
		std::stringstream string;
		for (std::vector<int>::iterator it = input.begin(); it != input.end(); ++it) {
			string << *it << "\n";
		}

		return string.str();
	}

	std::string RPCScan(PointF *p_xPos) {
		double dRng = 0.003;
		double dStp = 0.0002;

		std::set<quint64> aiCells;
		for (double dX = p_xPos->x() - dRng; dX < p_xPos->x() + dRng; dX += dStp) {
			for (double dY = p_xPos->y() - dRng; dY < p_xPos->y() + dRng; dY += dStp) {
				quint64 iCell = S2::PosToCellID(new PointF(dX, dY));
				iCell = S2::CellIDParent(iCell, 16);
				if (aiCells.find(iCell) != aiCells.end()) {
					continue;
				};

				aiCells.insert(iCell);
			}
		}

		std::vector<std::string> asCells;
		std::vector<int> aiDates;
		std::stringstream converter;
		for (std::set<quint64>::iterator it = aiCells.begin(); it != aiCells.end(); ++it) {
			converter.str("");
			converter << *it;
			asCells.push_back(converter.str());
		}
		aiDates.push_back(0);

		std::string sCmd = "gameplay/getObjectsInCells";
		std::map<std::string, std::string> xP;
		xP["knobSyncTimestamp"] = "1370000000000";
		xP["cellsAsHex"] = convertStringVectorToSingleString(asCells);
		xP["dates"] = convertIntVectorToSingleString(aiDates);

		return xP["cellsAsHex"];
	}

};


int main(int argc, char const *argv[])
{
	// std::stringstream stream;
	// stream << std::hex << S2::PosToCellID(new PointF(53.570113, 9.954555));
	// std::string result(stream.str());
	std::cout << S2::PosToCellID(new PointF(53.570113, 9.954555)) << "\n";
	return 0;
}