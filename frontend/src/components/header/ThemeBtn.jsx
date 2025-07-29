import useTheme from "../../../contexts/ThemeContext"

export default function ThemeBtn() {
  const { themeMode, darkTheme, lightTheme } = useTheme()
  
  const onChangeTheme = (e) => {
    const darkModeStatus = e.currentTarget.checked
    if (darkModeStatus) {
      darkTheme()
    } else {
      lightTheme()
    }
  }

  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer group">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={onChangeTheme}
          checked={themeMode === 'dark'}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 dark:peer-focus:ring-green-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-500">
          {/* Sun Icon */}
          <svg className="absolute top-1 left-1 w-4 h-4 text-yellow-500 opacity-100 peer-checked:opacity-0 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
          {/* Moon Icon */}
          <svg className="absolute top-1 right-1 w-4 h-4 text-blue-300 opacity-0 peer-checked:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {themeMode === 'dark' ? 'Dark' : 'Light'}
        </span>
      </label>
    </div>
  )
}

