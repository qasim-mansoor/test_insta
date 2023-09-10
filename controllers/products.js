const axios = require('axios');
const cheerio = require('cheerio');
const qs = require('qs');


async function searchVid(downloadURL){
    const url = "https://fastdl.app/c/";

    const pattern = /reels?\/(.*?)\//g;

    const matches = [...downloadURL.matchAll(pattern)];
    const reelID = matches.map(match => match[1]);
  
    const data = {
        url: "https://www.instagram.com/reel/" + reelID[0] + "/",
        lang_code: "en",
        token: '',
    };
  
    const dataLength = qs.stringify(data).length.toString();
  
    const headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Content-Length': dataLength,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://fastdl.app',
        'Referer': 'https://fastdl.app/',
        'Sec-Ch-Ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Microsoft Edge";v="116"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.69',
        'X-Requested-With': 'XMLHttpRequest',
      };
        
    maindata = await axios.post(url, qs.stringify(data), {headers}).then((res) => {
        const x = res.data;
        const y = x.data;
        const $ = cheerio.load(x);
        const filter1 = $(".py-2");
        const maindata = filter1.find("div > a").toArray()
        .map(element => $(element).attr('href'));
        const img = filter1.find("div > img").attr("src");
      // console.log(img)
        const result = Array(2)
        result[0] = maindata
        result[1] = img
        // console.log(result)
        return result;
  
    }).catch((err) => {
      console.log(err); 
    });

    return maindata
}

async function searchImg(){
    const url = "https://www.save-free.com/process";

    const dpUser = "leomessi";

    const data = {
        instagram_url: dpUser,
        type: "profile",
        resource: "save"
    };

    let maindata = "Not Found";

    const dataLength = qs.stringify(data).length.toString();

    const headers = {
        'Accept': 'text/html, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Content-Length': dataLength,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'cookielawinfo-checkbox-necessary=yes; cookielawinfo-checkbox-functional=no; cookielawinfo-checkbox-performance=no; cookielawinfo-checkbox-analytics=no; cookielawinfo-checkbox-advertisement=no; cookielawinfo-checkbox-others=no; HstCfa4752989=1691842047964; HstCmu4752989=1691842047964; HstCnv4752989=1; HstCns4752989=1; c_ref_4752989=https%3A%2F%2Fwww.google.com%2F; cf_clearance=QQoz39Eg25kWWIlg.xMbnnFWHJv4TYaLX7S_MpIwQ3s-1691842048-0-1-b4b97c53.e9d87639.c8ef7f33-0.2.1691842048; HstCla4752989=1691842152723; HstPn4752989=2; HstPt4752989=2',
        'Origin': 'https://www.save-free.com',
        'Referer': 'https://www.save-free.com/photo-downloader/',
        'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.200',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Valy-Cache': 'accpted'
    };
        
    maindata = await axios.post(url, qs.stringify(data), {headers}).then((res) => {
        const x = res.data;
        maindata = x.result.profile.profile_full_HD
        console.log(maindata);
        return maindata;

    }).catch((err) => {
        console.log(err); 
    });

    return maindata;

    
}

const getVid = async (req, res) => {
    const payload = req.body; // This will contain the JSON payload sent with the POST request
    console.log("Received JSON payload:", payload);
    const vid_link = payload.dllink
    console.log(vid_link)
    
    try {
        let maindata = await searchVid(vid_link)
        console.log(maindata);
        await res.status(200).json({dllink: maindata[0], img: maindata[1]})
    } catch (error) {
        console.log(error)   
    };
};

const getImg = async (req, res) => {
    
    try {
        let maindata = await searchImg()
        console.log(maindata);
        res.status(200).json({dllink: maindata})
    } catch (error) {
        console.log(error)   
    };
};

module.exports = {getImg, getVid};