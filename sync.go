//@author Stanislav Polaniev <spolanyev@gmail.com>

package main

import (
	"bufio"
	"fmt"
	"os"
	"path"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

var startTime = time.Now()
var wordCount = 0
var selectedWords []string

// var directory = filepath.FromSlash("./../data/a")
var directory = filepath.FromSlash("./../../../private/speed-comparison/data/a")

func main() {
	if fullPathDirectory, err := filepath.Abs(directory); err == nil {
		if _, err := os.Stat(fullPathDirectory); err == nil {
			if entries, err := os.ReadDir(fullPathDirectory); err == nil {
				for _, entry := range entries {
					wordCount += 1
					fullPathFrequency := path.Join(fullPathDirectory, entry.Name(), "2015-2017-spoken-frequency.txt")
					if _, err := os.Stat(fullPathFrequency); err == nil {
						if slice, err := os.ReadFile(fullPathFrequency); err == nil {
							if frequency, err := strconv.Atoi(string(slice)); err == nil {
								if frequency >= 798 {
									fullPathTranslation := path.Join(fullPathDirectory, entry.Name(), "translation.txt")
									if _, err := os.Stat(fullPathTranslation); err == nil {
										word := ""
										if fileDescriptor, err := os.Open(fullPathTranslation); err == nil {
											reader := bufio.NewReaderSize(fileDescriptor, 128)
											if word, err = reader.ReadString('\n'); err == nil {
												word = strings.TrimSpace(word)
												if err := fileDescriptor.Close(); err != nil {
													fmt.Println("Error closing file:", err)
												}
											}

											if word == "" {
												word = entry.Name()
											}
											selectedWords = append(selectedWords, word)
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	fmt.Printf("selected %d words from %d, took %.3f seconds\n", len(selectedWords), wordCount, time.Since(startTime).Seconds())
	/*
		for i, word := range selectedWords {
			fmt.Printf("%d. %s\n", i+1, word)
		}
	*/
}
