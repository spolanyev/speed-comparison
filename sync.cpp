//@author Stanislav Polaniev <spolanyev@gmail.com>

#include <chrono>
#include <iomanip>
#include <iostream>
#include <filesystem>
#include <fstream>
#include <string>
#include <vector>

int main() {
    auto start_time = std::chrono::high_resolution_clock::now();
    int word_count = 0;
    std::vector<std::string> selected_words;

    std::filesystem::path full_path_directory = std::filesystem::canonical(
            "./../../../private/speed-comparison/data/a");
    if (std::filesystem::exists(full_path_directory)) {
        for (const auto &entry: std::filesystem::directory_iterator(full_path_directory)) {
            word_count++;
            std::filesystem::path full_path_frequency = entry.path() / "2015-2017-spoken-frequency.txt";
            if (std::filesystem::exists(full_path_frequency)) {
                std::ifstream frequency(full_path_frequency);
                int number;
                frequency >> number;
                frequency.close();
                if (number >= 798) {
                    std::filesystem::path full_path_translation = entry.path() / "translation.txt";
                    if (std::filesystem::exists(full_path_translation)) {
                        std::string word;
                        std::ifstream translation(full_path_translation);
                        std::getline(translation, word);
                        translation.close();

                        //trim
                        size_t start = 0;
                        while (start < word.length() && std::isspace(word[start])) {
                            start++;
                        }
                        size_t end = word.length() - 1;
                        while (end > start && std::isspace(word[end])) {
                            end--;
                        }
                        word = word.substr(start, end - start + 1);

                        if (word.empty()) {
                            word = entry.path().filename().string();
                        }
                        selected_words.push_back(word);
                    }
                }
            }
        }
    }

    std::cout << "selected " << selected_words.size() << " words from " << word_count << ", took "
              << std::fixed << std::setprecision(3) << std::chrono::duration<double>(
            std::chrono::high_resolution_clock::now() - start_time)
                      .count() << " seconds\n";
    /*
    for (size_t i = 0; const auto &word: selected_words) {
        std::cout << ++i << ". " << word << "\n";
    }
    */
    return 0;
}
