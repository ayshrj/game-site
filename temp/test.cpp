#include <iostream>
#include <vector>
#include <cmath>
#include <cstdlib> // Required for srand() and rand()
#include <ctime> // Required for time()
using namespace std;

void print(vector<vector<int>>& grid) {
    for (int i = 0; i < grid.size(); i++) {
        for (int j = 0; j < grid[i].size(); j++) {
            cout << grid[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;
}

bool isValid(vector<vector<int>>& grid, int row, int col, int num) {
    for (int i = 0; i < row; i++) {
        if (grid[i][col] == num) return false;
    }

    for (int j = 0; j < col; j++) {
        if (grid[row][j] == num) return false;
    }

    int boxRow = floor((float)row / 3) * 3;
    int boxCol = floor((float)col / 3) * 3;

    for (int i = boxRow; i < row; i++) {
        for (int j = boxCol; j < col; j++) {
            if (grid[i][j] == num) return false;
        }
    }

    return true;
}

void generate(vector<vector<int>>& grid) {
    srand(std::time(nullptr));

    for (int i = 0; i < 9; i++) {
        vector<int> v;
        for (int j = 0; j < 9; j++) {
            int temp = 1 + rand() % 9;
            // while (!isValid(grid, i, j, temp)) {
            //     temp = 1 + rand() % 9;
            // }
            v.push_back(temp);
        }
        grid.push_back(v);
    }
}

int main() {
    vector<vector<int>> grid;
    generate(grid);
    print(grid);
    return 0;
}