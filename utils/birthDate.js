const daysUntilNextBirthDay = birthDay => {
    const DAY = 1 * 24 * 60 * 60 * 1000
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth() + 1

    const birthDayMonth = birthDay.getMonth() + 1
    const birthDayDate = birthDay.getDate()

    let nextBirthDayYear
    if (birthDayMonth > currentMonth) {
        nextBirthDayYear = currentYear
    } else {
        nextBirthDayYear = currentYear + 1
    }

    const nextBirthDay = `${nextBirthDayYear}-${birthDayMonth}-${birthDayDate}`
    return Math.round((new Date(nextBirthDay).getTime() - today.getTime()) / DAY) + (isLeapYear(currentYear) ? 1 : 0
    )
}

const isLeapYear = year => year % 4 === 0

module.exports = {
    daysUntilNextBirthDay,
    isLeapYear
}