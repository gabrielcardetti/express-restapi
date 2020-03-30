interface UserDto {
    username: string
    password: string
    role: string
}

interface EditPasswordDto {
    userId: number
    oldPassword: string,
    newPassword: string
}

export { UserDto, EditPasswordDto };