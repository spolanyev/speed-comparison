<?php

declare(strict_types = 1);

$startTime = microtime(true);
$wordCount = 0;
$selectedWords = [];

$fullPathDirectory = realpath(dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'a');
if (is_dir($fullPathDirectory)) {
    if (false !== ($directory = dir($fullPathDirectory))) {
        while (false !== ($entry = $directory->read())) {
            if ('.' === $entry || '..' === $entry) {
                continue;
            }
            $wordCount++;
            $fullPathFrequency = $fullPathDirectory . DIRECTORY_SEPARATOR . $entry . DIRECTORY_SEPARATOR . '2015-2017-spoken-frequency.txt';
            if (is_file($fullPathFrequency)) {
                $number = file_get_contents($fullPathFrequency);
                if (798 > intval($number)) {
                    continue;
                }
                $fullPathTranslation = $fullPathDirectory . DIRECTORY_SEPARATOR . $entry . DIRECTORY_SEPARATOR . 'translation.txt';
                if (is_file($fullPathTranslation)) {
                    $word = '';
                    if ($filePointer = fopen($fullPathTranslation, 'rb')) {
                        $line = fgets($filePointer);
                        fclose($filePointer);
                        if (false !== $line) {
                            $word = trim($line);
                        }
                    }

                    if ('' === $word) {
                        $word = $entry;
                    }
                    //echo $word, PHP_EOL;
                    $selectedWords[] = $word;
                }
            }
        }
        $directory->close();
    }
}

echo 'selected ', count($selectedWords), ' words from ', $wordCount, ', took ', round(microtime(true) - $startTime, 3), ' seconds', PHP_EOL;
/*
$i = 0;
foreach ($selectedWords as $word) {
    $i++;
    echo $i, ' ', $word, PHP_EOL;
}
*/
