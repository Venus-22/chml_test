package incclient

import (
	"fmt"
	"log"
	"os"
)

// IncLogger implements a logger for the incclient package.
type IncLogger struct {
	Log      *log.Logger
	IsEnable bool
}

// Printf overrides log.Printf.
func (l IncLogger) Printf(format string, v ...interface{}) {
	if l.IsEnable {
		l.Log.Printf(format, v...)
	}
}

// Println overrides log.Println.
func (l IncLogger) Println(v ...interface{}) {
	if l.IsEnable {
		l.Log.Println(v...)
	}
}

// Fatalf overrides log.Fatalf.
func (l IncLogger) Fatalf(format string, v ...interface{}) {
	if l.IsEnable {
		l.Log.Fatalf(format, v...)
	}
}

// Fatalln overrides log.Fatalln.
func (l IncLogger) Fatalln(v ...interface{}) {
	if l.IsEnable {
		l.Log.Fatalln(v...)
	}
}

// NewLogger creates a new IncLogger. If isEnable = true, it will do logging.
// If logFile is set, it will store logging information into the given logFile.
func NewLogger(isEnable bool, logFile ...string) *IncLogger {
	writer := os.Stdout
	if len(logFile) != 0 {
		var err error
		writer, err = os.OpenFile(logFile[0], os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
		if err != nil {
			fmt.Println("Error opening file:", err)
			os.Exit(1)
		}
	}
	Log := log.New(writer, "", log.Ldate|log.Ltime)

	return &IncLogger{
		Log:      Log,
		IsEnable: isEnable,
	}
}

// Logger prints necessary information during the use of the IncClient. Set Logger.IsEnable to true to print all the logs
// of this instance while using it. By default, it is disabled. For testing purposes, it should be enabled for devs to
// understand the running path of active functions.
var Logger = NewLogger(false)
