<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'Message';

    public function getKeyName(){
        return "message_id";
    }
     protected $fillable = [
        'receiver_id',
        'chat_id',
        'message_text',
        'sender_id', 
        'date_sent',
        'message_seen',
    ];
}
