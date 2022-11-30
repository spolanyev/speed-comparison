# About

I used languages I know to list 1286 folders of [the directory](/data/a) and then read 2 files from each. One file should be read entirely, the other - only the first line.

## System

Windows 10, Docker on WSL2 (synchronized with filesystem by volumes) on SSD Samsung 870 EVO 500GB

Ubuntu 22.04 LTS on HDD WDC WD5000AAKX-00ERMA0 500 GB

4-core Intel Core i5 3470

16 GB RAM

## Results*

### Windows / Docker

| Synchronous                    | Local Windows, sec | Through Docker, sec | Asynchronous               | Local Windows, sec | Through Docker, sec |
|--------------------------------|:------------------:|:-------------------:|----------------------------|:------------------:|:-------------------:|
| __node [sync.js](/sync.js)__   |        0.24        |         3.9         | __node async.js__          |        0.27        |         1.7         |
| __php [sync.php](/sync.php)__  |        0.29        |         6.6         | __php async-swoole.php__   | (not implemented)  |         1.8         |
| __python [sync.py](/sync.py)__ |        0.22        |         4.5         | __python async-trio.py**__ |        2.00        |         3.1         |
| __./[go](/sync.go)-sync__      |        0.17        |         6.7         | __./go-async**__           |        0.05        |         1.3         |
| __./[rust](/sync.rs)-sync__    |        0.15        |         4.2         | __./rust-async-tokio**__   |        0.05        |         0.8         |

### Ubuntu

| Synchronous                      | Local Ubuntu, sec | Asynchronous               | Local Ubuntu, sec | 
|----------------------------------|:-----------------:|----------------------------|:-----------------:|
| __node [sync.js](/sync.js)__     |       0.062       | __node async.js__          |       0.178       | 
| __php [sync.php](/sync.php)__    |       0.025       | __php async-swoole.php__   |       0.034       | 
| __python [sync.py](/sync.py)__   |       0.049       | __python async-trio.py**__ |      (error)      | 
| __./[go](/sync.go)-sync__        |       0.019       | __./go-async**__           |       0.007       | 
| __./[rust](/sync.rs)-sync__      |       0.015       | __./rust-async-tokio**__   |       0.014       | 


\* **Swoole** was faster then **Amp** and **ReactPHP**, **Tokio** was faster then native thread and **async-std**<br/>
** with mpsc channel


# Contacts

Contact me at [spolanyev@gmail.com](mailto:spolanyev@gmail.com?subject=Comparison) 
