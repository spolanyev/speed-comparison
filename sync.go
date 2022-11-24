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

// var directory = filepath.FromSlash("./../data/a")
var directory = filepath.FromSlash("./../../mine/dictionary/data/a")

func main() {
	startTime := time.Now()
	wordCount := 0
	selectedWords := []string{}

	fullPathDirectory, _ := filepath.Abs(directory)
	if _, err := os.Stat(fullPathDirectory); err == nil {
		entries, _ := os.ReadDir(fullPathDirectory)
		for _, entry := range entries {
			wordCount += 1
			fullPathFrequency := path.Join(fullPathDirectory, entry.Name(), "2015-2017-spoken-frequency.txt")
			if _, err := os.Stat(fullPathFrequency); err == nil {
				slice, _ := os.ReadFile(fullPathFrequency)
				frequency, _ := strconv.Atoi(string(slice))
				if 798 > frequency {
					continue
				}
				fullPathTranslation := path.Join(fullPathDirectory, entry.Name(), "translation.txt")
				if _, err := os.Stat(fullPathTranslation); err == nil {
					word := ""

					fileDescriptor, _ := os.Open(fullPathTranslation)

					reader := bufio.NewReader(fileDescriptor)
					word, err = reader.ReadString('\n')
					word = strings.TrimSpace(word)

					_ = fileDescriptor.Close()

					if word == "" {
						word = entry.Name()
					}
					//fmt.Println(word)
					selectedWords = append(selectedWords, word)
				}
			}
		}
	}

	fmt.Printf("selected %d words from %d, took %.3f seconds\r\n", len(selectedWords), wordCount, time.Since(startTime).Seconds())
	/*
		i := 0
		for _, word := range selectedWords {
			i++
			fmt.Printf("%d. %s\n", i, word)
		}
	*/
}
