<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionType extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'QuestionType';

    public function getKeyName(){
        return "question_type_id";
    }
}
