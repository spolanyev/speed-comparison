//@author Stanislav Polaniev <spolanyev@gmail.com>

use std::fs;
use std::fs::File;
use std::io::BufRead;
use std::io::BufReader;
use std::path::Path;
use std::time::Instant;

fn main() {
    let start_time = Instant::now();
    let mut word_count = 0;
    let mut selected_words = Vec::new();

    #[cfg(not(feature = "production"))]
    let path = Path::new(".")
        .join("..")
        .join("..")
        .join("mine")
        .join("dictionary")
        .join("data")
        .join("a");
    #[cfg(feature = "production")]
    let path = Path::new(".").join("..").join("data").join("a");

    let full_path_directory = fs::canonicalize(path).unwrap();
    if full_path_directory.is_dir() {
        for entry in fs::read_dir(&full_path_directory).unwrap() {
            word_count += 1;
            let entry = entry.unwrap();
            let full_path_frequency = full_path_directory
                .join(entry.file_name())
                .join("2015-2017-spoken-frequency.txt");
            if full_path_frequency.is_file() {
                let number = fs::read_to_string(full_path_frequency).unwrap();
                let number: u32 = number.parse().unwrap();
                if 798 > number {
                    continue;
                }
                let full_path_translation = full_path_directory
                    .join(entry.file_name())
                    .join("translation.txt");
                if full_path_translation.is_file() {
                    let mut word = String::new();

                    let file = File::open(full_path_translation).unwrap();
                    let mut reader = BufReader::new(file);
                    reader.read_line(&mut word).unwrap();

                    if word.is_empty() {
                        word = entry.file_name().into_string().unwrap();
                    }
                    selected_words.push(word.trim().to_owned());
                }
            }
        }
    }

    println!(
        "selected {} words from {}, took {} seconds",
        selected_words.len(),
        word_count,
        start_time.elapsed().as_millis() as f64 / 1000.0
    );
    /*
    for (i, word) in selected_words.into_iter().enumerate() {
        println!("{} {}", i, word);
    }
    */
}
