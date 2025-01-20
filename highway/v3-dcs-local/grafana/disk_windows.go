//go:build windows

package grafana

import (
	"fmt"
	"syscall"
	"unsafe"

	"golang.org/x/sys/windows"
)

// Lazy load Windows DLLs
var (
	kernel32           = windows.NewLazySystemDLL("kernel32.dll")
	getDiskFreeSpaceEx = kernel32.NewProc("GetDiskFreeSpaceExW")
)

func getDiskUsage() (string, error) {
	var freeBytesAvailable, totalNumberOfBytes, totalFreeBytes int64

	// Convert the path to a UTF16 pointer
	pathPtr, err := windows.UTF16PtrFromString(`C:\\`)
	if err != nil {
		return "", err
	}

	// Call the Windows system function
	ret, _, sysErr := syscall.Syscall6(
		getDiskFreeSpaceEx.Addr(),
		4,
		uintptr(unsafe.Pointer(pathPtr)),
		uintptr(unsafe.Pointer(&freeBytesAvailable)),
		uintptr(unsafe.Pointer(&totalNumberOfBytes)),
		uintptr(unsafe.Pointer(&totalFreeBytes)),
		0,
		0,
	)

	if ret == 0 {
		return "", sysErr
	}

	// Calculate the percentage of used disk space
	usedPercentage := fmt.Sprintf("%.2f", float64(totalNumberOfBytes-totalFreeBytes)*100.0/float64(totalNumberOfBytes))
	return usedPercentage, nil
}
