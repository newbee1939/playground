package main

import (
	"bufio"
	"os"
	"strconv"
)

// 標準入力を空白・改行区切りのトークン単位で読む。
// bufio.Scanner の既定バッファは 64KB しかないので競技用に拡張しておく。
var (
	reader = bufio.NewScanner(os.Stdin)
	writer = bufio.NewWriter(os.Stdout)
)

func next() string {
	reader.Scan()
	return reader.Text()
}

func nextInt() int {
	n, _ := strconv.Atoi(next())
	return n
}

func main() {
	reader.Buffer(make([]byte, 1024*1024), 1024*1024)
	reader.Split(bufio.ScanWords)
	defer writer.Flush()

	// 例: practice contest A —— 入力 "a", "b c", "s" に対して "a+b+c s" を出力する
	a := nextInt()
	b := nextInt()
	c := nextInt()
	s := next()
	writer.WriteString(strconv.Itoa(a+b+c) + " " + s + "\n")
}
