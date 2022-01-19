var lottery_initial_datas =[
    	{
        "nameen": "avatar1",
        "namezh": "3630"
       	},
        {
        "nameen": "avatar2",
        "namezh": "6855"
        }
        ,
        {
        "nameen": "avatar3",
        "namezh": "9948"
        },
        {
        "nameen": "avatar4",
        "namezh": "3680"
        }
        ,
        {
        "nameen": "avatar5",
        "namezh": "1603"
        }
        ,
        {
        "nameen": "avatar6",
        "namezh": "7576"
        }
        ,
        {
        "nameen": "avatar7",
        "namezh": "4584"
        },
        {
        "nameen": "avatar8",
        "namezh": "9310"
        },
        {
        "nameen": "avatar9",
        "namezh": "7995"
        },   
        {
        "nameen": "avatar10",
        "namezh": "2402"
        },
        {
        "nameen": "avatar11",
        "namezh": "6734"
        },
        {
        "nameen": "avatar12",
        "namezh": "6284"
        }
        ,
        {
        "nameen": "avatar13",
        "namezh": "8035"
        }
        ,
        {
        "nameen": "avatar14",
        "namezh": "9637"
        },
        {
        "nameen": "avatar15",
        "namezh": "9855"
        }
        ,
        {
        "nameen": "avatar16",
        "namezh": "9010"
        }
        ,
        {
        "nameen": "avatar17",
        "namezh": "7618"
        },
        {
        "nameen": "avatar18",
        "namezh": "7986"
        },
        {
        "nameen": "avatar19",
        "namezh": "1924"
        },
        {
        "nameen": "avatar20",
        "namezh": "1234"
        }
        ,
        {
        "nameen": "avatar21",
        "namezh": "8798"
        },
        {
        "nameen": "avatar22",
        "namezh": "7944"
        }
        ,
        {
        "nameen": "avatar23",
        "namezh": "7831"
        },
        {
        "nameen": "avatar24",
        "namezh": "9288"
        }
        ,
        {
        "nameen": "avatar25",
        "namezh": "6540"
        }
        ,
        {
        "nameen": "avatar26",
        "namezh": "1276"
        },
        {
        "nameen": "avatar27",
        "namezh": "7237"
        }
        ,
        {
        "nameen": "avatar28",
        "namezh": "8289"
        }
        ,
        {
        "nameen": "avatar29",
        "namezh": "1833"
        },
        {
        "nameen": "avatar30",
        "namezh": "4068"
        }
        ,
        {
        "nameen": "avatar31",
        "namezh": "2202"
        }
        ,
        {
        "nameen": "avatar32",
        "namezh": "2171"
        },
        {
        "nameen": "avatar33",
        "namezh": "3719"
        },
        {
        "nameen": "avatar34",
        "namezh": "2496"
       },
        {
        "nameen": "avatar35",
        "namezh": "3099"
        },
        {
        "nameen": "avatar36",
        "namezh": "5883"
        },
        {
        "nameen": "avatar37",
        "namezh": "8082"
        }
        ,
        {
        "nameen": "avatar38", 
        "namezh": "8214"
        }
        ,
        {
        "nameen": "avatar39",
        "namezh": "9509"
        },
        {
        "nameen": "avatar40",
        "namezh": "3709"
        }
        ,
        {
        "nameen": "avatar41",
        "namezh": "3464"
        }
        ,
        {
        "nameen": "avatar42",
        "namezh": "7867"
        },
        {
        "nameen": "avatar43",
        "namezh": "5890"
        },   
        {
        "nameen": "avatar44",
        "namezh": "3603"
        },
        {
        "nameen": "avatar45",
        "namezh": "8535"
        },
        {
        "nameen": "avatar46",
        "namezh": "1693"
        }
];

var award_config = {
    "award01": 1,
    "award02": 3,
    "award03": 6,
    "award04": 100//抽奖次数
};

// 初始化数据
//初始化抽奖号
if (!localStorage.getItem('lottery_initial')) {
    var data_str = JSON.stringify(lottery_initial_datas);
    localStorage.setItem('lottery_initial', data_str);
}
//初始化抽奖次数
if (!localStorage.getItem('award_initial')) {
    var award_str = JSON.stringify(award_config);
    localStorage.setItem('award_initial', award_str);
}