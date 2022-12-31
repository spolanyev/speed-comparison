# About

I used several languages to list a directory with 1286 folders to read in each folder one file entirely and another file's first line only to compare the speed.

Windows 10 and Docker on WSL2 (synchronized with filesystem by volumes) on SSD Samsung 870 EVO 500GB

Ubuntu 22.04 LTS on HDD WDC WD5000AAKX-00ERMA0

4-core Intel Core i5 3470

## Results*

### Windows / Docker

| Synchronous        | Local Windows, sec | Through Docker, sec | Asynchronous               | Local Windows, sec | Through Docker, sec |
|--------------------|:------------------:|:-------------------:|----------------------------|:------------------:|:-------------------:|
| __node sync.js__   |        0.25        |         3.9         | __node async.js__          |        0.27        |         1.7         |
| __php sync.php__   |        0.30        |         6.6         | __php async-swoole.php__   |     1.9 (WSL)      |         1.8         |
| __python sync.py__ |        0.24        |         4.5         | __python async-trio.py**__ |        0.8         |       3.1***        |
| __./go-sync__      |        0.17        |         6.7         | __./go-async**__           |        0.07        |         1.3         |
| __./rust-sync__    |        0.15        |         4.2         | __./rust-async-tokio**__   |        0.07        |         0.8         |
| __./cpp-sync__     |        0.18        |         ***         |                            |                    |                     |

### Ubuntu

| Synchronous         | Local Ubuntu, sec | Asynchronous               |      Local Ubuntu, sec       | 
|---------------------|:-----------------:|----------------------------|:----------------------------:|
| __node sync.js__    |       0.062       | __node async.js__          |            0.178             | 
| __php sync.php__    |       0.025       | __php async-swoole.php__   |            0.034             | 
| __python sync.py__  |       0.045       | __python async-trio.py**__ | (error: too many open files) | 
| __./go-sync__       |       0.019       | __./go-async**__           |            0.007             | 
| __./rust-sync__     |       0.015       | __./rust-async-tokio**__   |            0.014             | 
| __./cpp-sync__      |       0.018       |                            |                              | 


\* Swoole was faster than Amp and ReactPHP, Tokio was faster than native thread and async-std<br/>
** with channel for messaging<br/>
*** previous version result, need to re-measure<br/>

# How do I calculate results?

I take the average after several alternate runs.

![Javascript](https://github.com/spolanyev/compare-different-languages-in-file-system-reading/blob/main/win-js.png?raw=true)

![PHP](https://github.com/spolanyev/compare-different-languages-in-file-system-reading/blob/main/win-php.png?raw=true)

![Python](https://github.com/spolanyev/compare-different-languages-in-file-system-reading/blob/main/win-py.png?raw=true)

![Go](https://github.com/spolanyev/compare-different-languages-in-file-system-reading/blob/main/win-go.png?raw=true)

![Rust](https://github.com/spolanyev/compare-different-languages-in-file-system-reading/blob/main/win-rs.png?raw=true)

![C++](https://github.com/spolanyev/compare-different-languages-in-file-system-reading/blob/main/win-cpp.png?raw=true)

# Contacts

Contact me at [spolanyev@gmail.com](mailto:spolanyev@gmail.com?subject=Comparison) 
