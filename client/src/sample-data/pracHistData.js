const pracHist = [
    {
        _id: 3,
        date: "23 Jun 20",
        start: "11:52",
        dancers: [2,3,4],
        moves: [
            {
                time: "0:30",
                move: 2,
                position: [4, 3, 2],
                lag: [
                    { d_id: 2, lag: 0 },
                    { d_id: 3, lag: 1402 },
                    { d_id: 4, lag: 139 },
                ]
            },
            {
                time: "0:52",
                move: 4,
                position: [3, 4, 2],
                lag: [
                    { d_id: 2, lag: 852 },
                    { d_id: 3, lag: 380 },
                    { d_id: 4, lag: 0 },
                ]
            },
            {
                time: "1:20",
                move: 3,
                position: [3, 4, 2],
                lag: [
                    { d_id: 2, lag: 132 },
                    { d_id: 3, lag: 420 },
                    { d_id: 4, lag: 0 },
                ]
            },
            {
                time: "1:34",
                move: 3,
                position: [3, 4, 2],
                lag: [
                    { d_id: 2, lag: 0 },
                    { d_id: 3, lag: 320 },
                    { d_id: 4, lag: 694 },
                ]
            },
            {
                time: "1:50",
                move: 4,
                position: [2, 3, 4],
                lag: [
                    { d_id: 2, lag: 0 },
                    { d_id: 3, lag: 694 },
                    { d_id: 4, lag: 320 },
                ]
            }
        ]
    },
    {
        _id: 2,
        date: "22 Jun 20",
        start: "13:56",
        dancers: [1],
        moves: [
            {
                time: "0:30",
                move: 1
            },
            {
                time: "0:38",
                move: 3
            }
        ]
    },
    {
        _id: 1,
        date: "22 Jun 20",
        start: "13:31",
        dancers: [1, 2, 3],
        moves: [
            {
                time: "0:30",
                move: 1,
                position: [1, 3, 2],
                lag: [
                    { d_id: 1, lag: 0 },
                    { d_id: 3, lag: 500 },
                    { d_id: 2, lag: 630 },
                ]
            },
            {
                time: "0:38",
                move: 2,
                position: [1, 3, 2],
                lag: [
                    { d_id: 1, lag: 412 },
                    { d_id: 3, lag: 0 },
                    { d_id: 2, lag: 750 },
                ]
            }
        ]
    }
]

export default pracHist;