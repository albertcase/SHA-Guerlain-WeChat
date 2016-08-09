<!DOCTYPE html>
<html>
<head lang="en">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>娇兰管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" >
    <meta name="msapplication-tap-highlight" content="no">
    <link rel="stylesheet" type="text/css" href="/html/css/guest.css"/>
    <link rel="stylesheet" type="text/css" href="/html/css/font-awesome.min.css"/>
    <script type="text/javascript" src="/js/jquery-1.7.2.min.js"></script>
    <script type="text/javascript" src="/html/js/guest2.js"></script>
</head>
<body>
    <div class="mainclass">
      <div  style="margin:0px 5%;"><img src="/app/images/logo.png" style="text-align:center"/></div>
      <hr style="margin:0px 20px">
      <div class="checkoption">
        <div class="tableinfo">
          SEARCH CRITERIA:
          <select id="allorders">
            <option value="second">姓</option>
            <option value="first">名</option>
            <option value="sex">称呼</option>
            <option value="bak1">服务</option>
            <option value="type">期望的联系方式</option>
            <option value="status">状态</option>
          </select>
          <!-- <i class="fa fa-chevron-down" style="color:#ddd;margin-left:-10px"></i> -->
          <i class="fa fa-plus-square"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          SHOW:
          <select id="everypage">
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          <!-- <i class="fa fa-chevron-down" style="color:#ddd"></i> -->
          <!-- <button class="btn-blue" id="searchbt" style="margin-left:40px;">Search</button> -->
          <span id="searchbt" style="margin-left:40px;cursor:pointer">SEARCH</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span id="sumtotal"></span>
          <span id="logout">Logout</span>
        </div>
        <div class="dataoption">

        </div>
        <div>
        </div>
      <div id = "loginlist">
        <table border="1"  class="bespeaklist">
          <thead>
            <tr>
              <th>No.</th>
              <th>姓</th>
              <th>名</th>
              <th>称呼</th>
              <th>联系电话</th>
              <th>电子邮件</th>
              <th>期望的联系方式</th>
              <th>需要的服务</th>
              <th>预约日期</th>
              <th>特殊要求</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
<!-- bespeak list -->
<!-- bespeak list end -->
          </tbody>
        </table>
        <div class="bespeaklistfoot">
          <ul>
<!-- page list -->
<!-- page list end -->
          </ul>
        </div>
      </div>
    </div>
</div>
    <div class="tembox"></div>
    <div class="popupbox2"></div>
</body>
</html>
