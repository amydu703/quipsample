/**
 * Created by xiuhua on 15-9-12.
 */
var React = require('react');
var Ajax = require('ajax-request');
var Cookies = require('cookies-js');
var User = React.createClass({

    getInitialState: function() {
        return {data_uri: null}
    },

    handleClick: function() {
        React.findDOMNode(this.refs.avatar_username).style.display = "none";
        React.findDOMNode(this.refs.userform).style.display = "inline";

    },
    handleSubmit: function() {
        var url="http://quip.lo/user/updateavatar";
        var postData = {};
        postData.avatarImg = this.state.data_uri,
            postData.userId = 4;
        console.log("postData.avatarImg");
        console.log(postData.avatarImg);
        var avatarImg = "testavatar";
        var userId = "4";

        Ajax.post({
            url:url,
            data:{avatarImg: avatarImg, userId: userId},
            json: true,
            success:function(data){
                console.log("avatar img return");
                console.log(data);
            }
        });
       return false;
    },
    handleFile: function(e) {
        var reader = new FileReader();
        var file = e.target.files[0];

        reader.onload = function(upload) {
            this.setState({
                data_uri: upload.target.result
            });
            console.log("imgurl");
            console.log(this.state.data_uri);
            React.findDOMNode(this.refs.avatarImg).style.display="block";
            React.findDOMNode(this.refs.avatarImg).src=this.state.data_uri;

        }.bind(this);

        reader.readAsDataURL(file);
    },
    render: function() {
        return (


            <div>
                <dl ref="avatar_username">
                    <dt onClick={this.handleClick}>头像111{Cookies.get('userAvatar')}</dt>
                    <dd onClick={this.handleClick}>名字1111{Cookies.get('username')}</dd>
                </dl>


                <div ref="userform" style={{display: 'none',clear:'both',float:'right',postion:'absolute',top:'0',right:'0'}}>
                    <form ref="myForm" enctype="multipart/form-data" onSubmit={this.handleSubmit}>
                    <span>username:</span><span><input type="text" name="username" id="username"/></span><br/>
                        <span>avatar:</span>
                        <span><input type="file" ref="uploadImg" accept="image/*" name="uploadImg" id="uploadImg" onChange={this.handleFile}/></span>
                        <br/>
                        <span><img src="" ref="avatarImg" id="avatarImg" width="50px" height="50px" style={{display:'none'}}/></span>
                        <br/>
                        <button id="saveuser" >保存</button>
                    </form>
                </div>
            </div>
        );
    }
});


module.exports = User;
