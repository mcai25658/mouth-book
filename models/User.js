import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'first name is required'],
      trim: true,
      text: true,
      minlength: [3, 'firstName 最少三個字'],
      maxlength: [20, 'firstName 最多20個字'],
    },
    lastName: {
      type: String,
      required: [true, 'last name is required'],
      trim: true,
      text: true,
      minlength: [3, 'lastName 最少三個字'],
      maxlength: [20, 'lastName 最多20個字'],
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      trim: true,
      unique: true,
      minlength: [3, 'username 最少三個字'],
      maxlength: [20, 'username 最多20個字'],
      // text: true,
    },

    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      index: true,
      unique: true,
      validate: {
        validator: isEmail,
        message: '無效的 Email',
      },
    },

    password: {
      type: String,
      required: [true, 'password is required'],
    },
    picture: {
      type: String,
      trim: true,
      default:
          'https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png',
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'gender is required'],
      trim: true,
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    requests: [
      {
        type: ObjectId,
        ref: 'User',
      },
    ],
    search: [
      {
        user: {
          type: ObjectId,
          ref: 'User',
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highSchool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ['Single', 'In a relationship', 'Married', 'Divorced'],
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: 'Post',
        },
        savedAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(uniqueValidator, { message: '{PATH} 已經存在' });

// @desc 將數據轉成 JSON 時呼叫的 hook
userSchema.method('toJSON', function () {
  const {
    _id,
    firstName,
    lastName,
    username,
    picture,
    verified,
  } = this.toObject();

  return {
    _id,
    firstName,
    lastName,
    username,
    picture,
    verified,
  };
});

// @desc 每次數據儲存前都會 call 這個 hook, 所以需確認密碼這個欄位是否有修改, 如果沒有修改,就直接call next(), 若是密碼有修改,則將密碼加密
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// @desc 建立 JWT
userSchema.methods.createJWT = function () {
  return jwt.sign({ userID: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIVE_TIME,
  });
};

// @desc 密碼驗證
userSchema.methods.matchPassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model('User', userSchema);

export default User;
