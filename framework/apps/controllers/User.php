<?php
/**
 * @author Kron
 * @since 15/9/8 17:47
 */

namespace App\Controller;

use Swoole;

class User extends Swoole\Controller
{
    public $is_ajax = true;

    public function __construct($swoole)
    {
        parent::__construct($swoole);
        $this->model = model('User');

    }

    public function login()
    {
        //var_dump(Swoole::$php->session);
        $this->tpl->display('user/login.php');
    }

    public function logout()
    {
    }

    public function updateAvatar(){
        $user = $_SESSION['user'];
        $user=array("id"=>3);
        $imgUrl = $_POST['avatarImg'];
      /*  print_r($user);
        print_r($imgUrl);*/
        //$imgUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMD…v9Bktm+1zmFPOPCQKAmMA8rgD8qu2wuYraaWVIWiJ2CEE7OBwcYHPvWawcK2kVZmE4ty5mf//Z";

        if (empty($user)) {
            return ['code' => 4, 'data' => '', 'msg' => 'who are you?'];
        }
        $id  =$user['id'];

        if($imgUrl){

            //更新头像
            $data = array(
                'avatar'=>$imgUrl

            );
            $where = "id";

            return $this->model->toUpdateAvatar($id,$data,$where);

        }else{
            return ['code' => 5, 'data' => '', 'msg' => 'I can not receive avatar img ?'];
        }

    }





   /* public function test(){

        $str = $this->user->testModel();
        echo $str;
    }*/

    public function test(){

      $data = $this->model->getUserInfo();

        //$data = array("dfsaf");
        return ['code' => 0, 'data' => $data, 'msg' => 'success01'];
    }
}