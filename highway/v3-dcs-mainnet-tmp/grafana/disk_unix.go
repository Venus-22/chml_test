//go:build darwin || linux || freebsd
// +build darwin linux freebsd

package grafana

import (
	"fmt"
	"syscall"
)

func getDiskUsage() string {
	fs := syscall.Statfs_t{}
	err := syscall.Statfs(".", &fs)
	if err != nil {
		return "0"
	}

	// Total and used disk space
	all := fs.Blocks * uint64(fs.Bsize)
	free := fs.Bfree * uint64(fs.Bsize)
	used := all - free
	if all == 0 {
		return "0"
	}

	percentage := float64(used*100) / float64(all)
	return fmt.Sprintf("%.2f", percentage)
}
