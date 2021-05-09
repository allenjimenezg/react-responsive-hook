// TODO: Add React dependency to project
import { useEffect, useState } from 'react'

// LOCAL IMPORTS
import { Device } from './Device'

const mobile = new Device('mobile', 0, 768)
const tablet = new Device('tablet', 769, 992)
const laptop = new Device('laptop', 993, 1900)
const desktop = new Device('desktop', 1901, Number.MAX_SAFE_INTEGER)

export { Device }
export const Devices = {
  default: mobile,
  mobile,
  tablet,
  laptop,
  desktop,
}

export const useDevice = (device: Device) => {
  const [match, setMatch] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(device.mediaQuery)

      setMatch(mediaQueryList.matches)

      const handleDeviceChange = (e: MediaQueryListEvent) => {
        setMatch(e.matches)
      }

      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', handleDeviceChange)

        return () => {
          mediaQueryList.removeEventListener('change', handleDeviceChange)
        }
      } else {
        mediaQueryList.addListener(handleDeviceChange)

        return () => {
          mediaQueryList.removeListener(handleDeviceChange)
        }
      }
    }
  }, [])

  return match
}

export const useResponsive = () => {
  const isMobile = useDevice(Devices.mobile)
  const isTablet = useDevice(Devices.tablet)
  const isLaptop = useDevice(Devices.laptop)
  const isDesktop = useDevice(Devices.desktop)

  const getCurrentDevice = () => {
    if (isMobile) {
      return Devices.mobile
    }

    if (isTablet) {
      return Devices.tablet
    }

    if (isLaptop) {
      return Devices.laptop
    }

    if (isDesktop) {
      return Devices.desktop
    }

    return Devices.default
  }

  return getCurrentDevice()
}

export default useDevice
