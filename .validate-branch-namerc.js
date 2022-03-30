module.exports = {
  pattern: '^((?!\/)+(?![A-Z]).)+$',
  errorMsg:
    '🤨 Your branch should not contain "/" and uppercased characters. Use `git branch -m <current-name> <new-name>`',
}
