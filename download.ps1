# Ensure the download directory exists
New-Item -ItemType Directory -Force -Path "stitch_screens"

$screens = @(
    @{
        name = "login-portal-refined"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLt41-YJTGlRb3YQCuQ6oUzgQbEN5S_QRB7QQrH4lBfI8o1ExWd94Z8fJgH_jMQOlqb-w_DN8YczBLKuhIon0GVBMRkHrvknE3NTu-HvfhndK7ZqB2-Y0xUHMq18kqyGmjFZ8IaUwQkpa6JxLKDrxDvGpnhrEbckRbYY85jnjU1yZ6Xog6bCbB-tcRi92uSn9qx80ANkC6x8Vvq2FOfiUb_tMq_55t8-02F4woV6G8M_52JquIL2ooWPcgU"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FhOTE1ZWYyMzk4ZjQzZjY5NTZjZTUxZTc3MTBjYjJkEgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "admin-dashboard-refined"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLt1AIuFOX4pESEhF39GqzTuf50NIzFLKd-oLELBAsVUSqEZ3wWELxZkWmWZyngy7rqD_uQNauHhSQyZws4E1E02MSQ-gnfm1llnLllDTAan8c5OYbhScSBR7Ib6H6j870G6LbueaOXjsU1ZTh6qIgAfoWz6FKJDdsa38lmy2JPA_KG6Nx6p5e9Ce0KaKbs-cemLYEkmHExQqgl2-QI53LzFN6Uz66-hPbPpU2v4cugdm2Luj3DTLAra3Y95"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzAyYTAwZDBkMWJhODRhODNhNTI4Y2M5NjVkNjUxYTM2EgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "admin-dashboard-search-results"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLupR5LSGo_GOWcdDxzvF8Lrl_fZ2B7xkE2zfZRMZnY-5Byj94aVKyyFGvGZm0wDFMRxp0IvGWsqS-78Y6KDd8tBtwh7I66MNHQieJy0iv1OI-BFby6Zng6x1C0qn_PPUyUr6oYoM6UlNgbOwQjtB7zKFLs6vPfmgUjzjhG9XMqK7U81Sh01FKnhB_1lZG1Xeb8b_ASAWEH37atwdc8KWffeVdcX3HUxbIgC-NWWMvPr7F3kTACgvnnq2pz7"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2I5Nzc2MTgzOTFmNjQ1NWQ4YTZhMTI2ZjJmNzhlOTRjEgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "attendance-management-teacher-view"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLvWun14PXV9RuxmjhO7FytW_k7ndbMbW82Iegr8QIb032skI5ensRF97zE1tmLWdBysIBWFIoAf30iZ_3hlAuR6QZAkZ6B3oajNNNDyG1TbpJGBFT_jppxVqvA9stwfVYFzHD8kDMBpBxty8k0xdfEJl4avCcL7Bu-QGvzSUQgmZy2IlONQmrK7UNND2tgZMHjxSlQNfWRZV2iQmy6ZDZ90k1NDvqjrRE5YQIGiMqP5uYdadrSJ7bk3Ht_v"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzViYjYwMDE2ZGVhNjQyNjViY2ZhNDgwZmRiM2FmZjljEgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "results-mark-sheet"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLsyvoUEmPQ_dVRJO-9kzOCC7vTEyoRxtduLqNoM3HQHYTiiyybVawS5j3GT3PXRixMwa-n1fka8PlGUL4CcLN0smTtJ913A-9ncA36bkhnqPpCLQGUtFPaWUh4CG6h4Y168IroSC3p9vROpn6S1V9u7V8QK2w3ubjcgVxC3XehJRCGtbJiev7OJODblbQjbSkugdImp_whzHLgNkTKLnip_ATY_Yh97MLKAFOjuwWQgwD5lf0UziIdCgoo"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2M5YTRjNjFiYzU0YzQ5YWU5OTU2YzBiY2E5ZmJkMjVmEgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "teacher-marks-entry"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLvWA2RymOBHFT943Q9PNTeqKjFhH7GIequyM11zDV2Z6NbVth-m93YIzAHegMlUuf5egR685ucF4-nOHvO0xh188JT4EQQGHZwziqqx6PX8Sim9w0FLvesocyzQncQlxSOuJmsaTGPXoOnrFGe1O8GmcZZdTSwdsOQd_tBr8XIEUddfjkIZppmagz_ASWCoCZ-OHrmmi3UzqpLe7VXqnZxnoVVa9xyhGgk1bf66aDVVfvkBpXGMD4FYm5CS"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzU0MjFhZDgwNTBjMzQxZDZiYjRkNDYxYzAwNmNhMzE4EgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "student-dashboard"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLsEKj57vUA8Pv_mBYS17fdEv6OLXbYoXDd-aQC9K1D_sPc892wNantE_onrK3mFvINyzF4Zcdg06ZaoHzm7-Ahd-zTxPxzQtVumazqWVbWdijY-ctRIQvx6ZKtUSz7kdp6gwD2Yhy6MRXfBu_HZcjKgDanwRerZrsEJLAqZATZLWXPZMzoK_foHGAXIVQ_G3lhYZ8pgMJZ40ZHtZqSE1Dr8wHk7I8AsaYnY1DUVdmGM-wAhB_BLUHDIGJY"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzJkY2E2MTdjZTc4MjQ1OWRhNTAzOGU3ZTY0OWFmZDhlEgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "student-dashboard-notifications-view"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLv6dGt4sZZ5QRsJaK8gUUC7Ow3hP_y_daB17a5e1eLEh6W7ozPGbD7QjewkGtyu6nk0m1lDbw79SRXnluK4dpJxkYlIs41o8Dx41rHcrDMfuCvYqwtYUKhu70CocLOV0q27Z3Te3QZUFBF_YkgpHwYQ_LwLxogF7C05-n6Lz8biLR4G3O4qPSqeKrlXO84H1Z9r9dw7NG8JwnjZgvUqZM3WNvhhwor78HQU0jDc5tuEVj8_7XxbOlZfH90"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzVkN2UyODgyYWM3NDQyZTBiZmU2NjgxOGMzMmFhMDg1EgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "student-dashboard-empty-state"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLtoldd8QgtkoN-AvWpptD8wMvClQ275ktajarIKbI_A-OZ80QZppBOquCfZ2cE-wJR_k5iN6GakbGjPuuA0zFP1tC5tz3sKnZ7c-UI62dcX0IfbNJzJF_Rha6N7945UYNcJhvxkBV7CEnvPaLY1dIlgpe1mfdfk-60IFzb_YVUVIiHjmvsVQVsh9y3T-j5J-CRN94NmQ4lZQa865ACIzBxy52Qyy8Kvxtvkuw_pc739ZwyLI91nPPbHMCrH"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2VjMzhiODQyZjcyNDRjOTQ5Zjg2ZDI1ODE1YjE0Y2ExEgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "student-profile-management"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLvF9blPkP6qt86vhMQ3bVHSfblDcWPZgzItocPrc7wcwa9Q5pVsJDa1qfwiOgIaUzb4TY7ckCLITK_t_t_EM1jrQ4QtDlOd12h8nHzq2jxbiFRujTyGr08Bv6oRMrfUYSu_keTc6drVrTu-xe4SywC0zag6QouT-zmnIuBZz7sn_O2s1K7mwAbYlLH1ktnCD1UwIuoLIYxaoMwDyhMdF39zoT5mNg8paUl0M0sw-zkXe7sbeW4Va5mKeMIF"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzY3NmNmNzA5YjMwYzRkM2ViNDlkMTE0ZjEzZTM4MTQ4EgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "fees-payment-desktop"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLtyd7aZpbQXVm42r7W3r0X0_rI8xzapGigGGOPj_L7E_ZVBGj1hfzla6tva7fqqLKyuvm3984HRydKm1TM4C-Xs8_tahmWRm3m8FBw5j3BDNJkLl4l-kJ-6s9DTHtU9Au1kNx-XBaaYxa2ryaFrCBFjJ8jGgaq0GhrvJib_SUBT5QEQCIrftL0W5FKhKuXi3F9TQhVC8GFOvvB39iyeScnO2d4G28SeOEvI01IiLgKQjZF6Iwp2Pk8G8A_6"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2I1NDIyNzgzYjA1ZDRkYzRiYmNkOTA1YzIwOGVlZTM2EgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "student-registration-form"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLtsBNAba4i0uvvkX3Sfqi0NaTWW30QbBdSUxmjZo9b4Mn8PtqW0CmEOnjKk9eF6Ng4rRRNzFreTAJII38QFYIz4E4UxH22hCATG85jFog0ld7iIpQLK_2yYL79hXAtaxVpvANprL__rZ4FjFQuB3ZE0u35qjQh8mPLyLgT61odQ9EF0QbEW436sd6oT4AbXX7J3VY1mmj3k3czeBWBmgDtit21CHTCUwy1LJFmqEboD4oSUraD7XIMVt2Cs"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2JmMzIyZWMyNzcyODQ2NDRiYmZjMDI5MDY1MjBiNjEyEgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "student-profile-edit-mode"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLt8CGvJaP-zMR54wmj5UO6bEGIhuDzGOZE8aHGdjyFZrmVSqv00-bYPNZXv0QTjRhP110QorGz3NK98HDD7tWodJCmQcKpTd7odRKerrlUVdSv6PTDY2CYy_RNIh1gNe926vgI8iWr_eGxXHPPzlWgYwQocquwuP4nSnqLc_TNrElaT_jSxX7c9v7HZiCWIWVBvTAUKWOTM7Pf2DMR00Cn_FPbczEYNQwy7j88kKep5rTqt_QMOXP8gV06M"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2E0ZDA1MWM4OTM2NDQ5YzBiZTAyODBmYmRmNWJlZTdjEgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    },
    @{
        name = "admin-dashboard-notifications-view"
        img = "https://lh3.googleusercontent.com/aida/AP1WRLtXS9NMPbIozgRcQGmX8spRmboDlkAP50d6EDh6mMDZWBEP1Az7_hb8Af-LTZEvVOMQIduq-VY8v6ofXN1aH20suAO5JitHQtSBXrFv7TErZmzWo6iyGFoHelqJ5QtM2hjk2vFbKpIa68TR-IAeWb_VYXBVbX7nbgYG82K6-bJxBp4yMG1Z---LVSCreetKsATO3U2cFPvF4lG2hyBDATkH-J7dGoCawhry9GbvXX8lphSCwZamS_Ag7Gs"
        html = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2U5MDY4NzAyZDg1ZDQ0ZGU5YTNhNDM0NDkwOTdmYjljEgsSBxCI4b2fiR4YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzU2OTM1MTU2MTUzMDU4NDY3Mg&filename=&opi=89354086"
    }
)

foreach ($screen in $screens) {
    Write-Host "Downloading images and code for: $($screen.name)"
    
    # Download Screenshot
    $imgPath = "stitch_screens/$($screen.name).png"
    curl.exe -L -o $imgPath $screen.img

    # Download HTML
    $htmlPath = "stitch_screens/$($screen.name).html"
    curl.exe -L -o $htmlPath $screen.html
}

Write-Host "All downloads complete!"
