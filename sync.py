# @author Stanislav Polaniev <spolanyev@gmail.com>

import os
import time

start_time = time.perf_counter()
word_count = 0
selected_words = []

full_path_directory = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'data', 'a'))
if os.path.isdir(full_path_directory):
    with os.scandir(full_path_directory) as iterator:
        for entry in iterator:
            word_count += 1
            full_path_frequency = os.path.join(full_path_directory, entry.name, '2015-2017-spoken-frequency.txt')
            if os.path.isfile(full_path_frequency):
                with open(full_path_frequency, 'r', encoding='UTF8') as file_descriptor:
                    number = file_descriptor.read()
                if int(number) >= 798:
                    full_path_translation = os.path.join(full_path_directory, entry.name, 'translation.txt')
                    if os.path.isfile(full_path_translation):
                        word = ""
                        with open(full_path_translation, 'r', buffering=128, encoding='UTF8') as file_descriptor:
                            word = file_descriptor.readline().strip()
                        if "" == word:
                            word = entry.name
                        selected_words.append(word)

print("selected {} words from {}, took {:.3f} seconds".format(len(selected_words), word_count,
                                                              time.perf_counter() - start_time))

# for i, word in enumerate(selected_words):
#    print("{}. {}".format(i + 1, word))
