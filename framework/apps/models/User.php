<?php
namespace App\Model;
use Swoole;

class User extends Swoole\Model
{
    /**
     * 表名
     * @var string
     */
    public $table = 'users';


    public function getUserInfo(){
        $sql = "select * from users  where id=4";
        $data = $this->db->query($sql)->fetch();
        return $data;

    }


    public function toUpdateAvatar($id,$data,$where){
        $result = parent::set($id,$data,$where);

        if (false === $result) {
            return ['code' => 1, 'data' => '', 'msg' => 'fail'];
        } else {
            return ['code' => 0, 'data' => '', 'msg' => 'success'];
        }


    }

}
