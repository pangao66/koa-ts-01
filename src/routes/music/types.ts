export interface TopBannerContent {
    cover: string
    id: number
    jump_info: {
        id: number
        mid: string
        url: string
    }
    listen_num: number
    pic_info: {
        mid: string
        url: string
        urlex1: string,
        urlex2: string
    }
    report: string,
    sub_title: string,
    title: string,
    type: 10002|10014|10012
}
