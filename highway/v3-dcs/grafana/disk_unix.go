//go:build darwin || linux || freebsd || openbsd || netbsd

package grafana

import (
	"fmt"
	"syscall"
)

// getDiskUsage returns the disk usage as a percentage for Unix-based systems
func getDiskUsage() (string, error) {
	fs := syscall.Statfs_t{}
	err := syscall.Statfs("/", &fs)
	if err != nil {
		return "", err
	}
	all := fs.Blocks * uint64(fs.Bsize)
	free := fs.Bfree * uint64(fs.Bsize)
	used := all - free
	usedPercentage := fmt.Sprintf("%.2f", float64(used)*100.0/float64(all))
	return usedPercentage, nil
}
