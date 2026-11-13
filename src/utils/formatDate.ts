export function formatDate(value: string): string {
    return new Intl.DateTimeFormat('vi-VN').format(new Date(value))
}