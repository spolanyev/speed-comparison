//@author Stanislav Polaniev <spolanyev@gmail.com>

use std::fs;
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::path::Path;
use std::time::Instant;

fn main() {
    let start_time = Instant::now();
    let mut word_count = 0;
    let mut selected_words = Vec::new();

    #[cfg(not(feature = "production"))]
    let directory = Path::new(".")
        .join("..")
        .join("..")
        .join("private")
        .join("speed-comparison")
        .join("data")
        .join("a");
    #[cfg(feature = "production")]
    let directory = Path::new(".").join("..").join("data").join("a");

    let full_path_directory = fs::canonicalize(directory).expect("Failed to canonicalize");

    if full_path_directory.is_dir() {
        for entry in fs::read_dir(&full_path_directory).expect("Failed to read dir") {
            word_count += 1;
            let entry = entry.expect("Failed entry");
            let full_path_frequency = full_path_directory
                .join(entry.file_name())
                .join("2015-2017-spoken-frequency.txt");

            if full_path_frequency.is_file() {
                let number =
                    fs::read_to_string(full_path_frequency).expect("Failed to read to string");
                let number: u32 = number.parse().expect("Failed to parse");

                if number >= 798 {
                    let full_path_translation = full_path_directory
                        .join(entry.file_name())
                        .join("translation.txt");

                    if full_path_translation.is_file() {
                        let mut word = String::new();

                        let file = File::open(full_path_translation).expect("Failed to open");
                        let mut reader = BufReader::with_capacity(128, file);
                        reader.read_line(&mut word).expect("Failed to read line");
                        word = word.trim().to_owned();

                        if word.is_empty() {
                            word = entry.file_name().into_string().expect("Failed into string");
                        }
                        selected_words.push(word);
                    }
                }
            }
        }
    }

    println!(
        "selected {} words from {}, took {:.3} seconds",
        selected_words.len(),
        word_count,
        start_time.elapsed().as_secs_f64()
    );
    /*
    for (i, word) in selected_words.into_iter().enumerate() {
        println!("{}. {}", i + 1, word);
    }
    */
}
