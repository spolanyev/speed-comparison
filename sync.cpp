//@author Stanislav Polaniev <spolanyev@gmail.com>

#include <chrono>
#include <iostream>
#include <filesystem>
#include <fstream>
#include <string>
#include <vector>
#include <ranges>
#include <format>

int main() {
    auto start_time = std::chrono::high_resolution_clock::now();
    int word_count = 0;
    std::vector<std::string> selected_words;

    std::filesystem::path full_path_directory = std::filesystem::canonical(
            "./../../../private/speed-comparison/data/a");
    if (std::filesystem::exists(full_path_directory)) {
        for (const auto entry: std::filesystem::directory_iterator(full_path_directory)
                               | std::views::transform([](const auto &entry) {
            return std::make_pair(entry, entry.path() / "2015-2017-spoken-frequency.txt");
        })) {
            word_count++;
            auto &[entry_info, full_path_frequency] = entry;
            if (std::filesystem::exists(full_path_frequency)) {
                if (std::ifstream frequency(full_path_frequency); frequency) {
                    int number;
                    frequency >> number;
                    if (number >= 798) {
                        std::filesystem::path full_path_translation = entry_info.path() / "translation.txt";
                        if (std::filesystem::exists(full_path_translation)) {
                            std::string word;
                            if (std::ifstream translation{full_path_translation}; std::getline(translation, word)) {
                                //trim
                                word.erase(0, word.find_first_not_of(" \t\n\r"));
                                word.erase(word.find_last_not_of(" \t\n\r") + 1);
                            }

                            if (word.empty()) {
                                word = entry_info.path().filename().string();
                            }
                            selected_words.push_back(word);
                        }
                    }
                }
            }
        }
    }

    std::cout << std::format("selected {} words from {}, took {:.3f} seconds\n", selected_words.size(), word_count,
                             std::chrono::duration<double>(
                                     std::chrono::high_resolution_clock::now() - start_time).count());
    /*
    size_t i = 0;
    for (const auto &word: selected_words) {
        std::cout << std::format("{}. {}\n", ++i, word);
    }
    */
    return 0;
}
