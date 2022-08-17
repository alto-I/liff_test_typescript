import axios from 'axios';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import liff from '@line/liff';
import { getCsrfToken } from "./getCsrfToken";


type Inputs = {
  product: string;
  totalScore: number;
  nickname: string;
  title: string;
  description: string;
};

const LineForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const saveReview = (data: Inputs) => {
    axios.post(
      '/line/reviews',
      {
        review: {
          review_target_id: data.product,
          total_score: data.totalScore,
          nickname: data.nickname,
          from_line: true
        }
      },
      {
        headers: {
          'X-CSRF-Token': getCsrfToken()
        },
      }
    ).then((response) => console.log(response))
    .catch((error) => console.error(error))
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => alert(JSON.stringify(data))

  return (
    <>
      liff_version: {liff.getVersion()}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-8px'>
          <label>
            商品
            <select className='form-input form-input--block' {...register('product')}>
              {/* {reviewTargets.map((reviewTarget) => (
                <option key={reviewTarget.id} value={reviewTarget.id}>
                  {reviewTarget.name}
                </option>
              ))} */}
              <option value='1'>クレンジング</option>
              <option value='2'>フォーム</option>
            </select>
          </label>
        </div>
        <div className='mb-8px'>
          <label>
            総合評価
            <select {...register('totalScore')} defaultValue={'3'}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </label>
        </div>
        <div className='mb-8px'>
          <label>
            ニックネーム
            <input {...register('nickname', { required: true })} />
          </label>
        </div>
        <div className='mb-8px'>
          <label>
            タイトル
            <input {...register('title', { required: true })} />
          </label>
        </div>
        <div className='mb-8px'>
          <label>
            本文
            <textarea {...register('description', { required: true })} />
          </label>
        </div>
        <input type='submit' value="投稿する" />
      </form>
    </>
  );
};

export default LineForm;
