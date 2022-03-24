<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Privacy extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'Privacy';

    public function getKeyName(){
        return "privacy_id";
    }

}
