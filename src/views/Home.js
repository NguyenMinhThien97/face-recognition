import React, { Component } from 'react';

const exampleImage = require('../img/example.jpg');

export default class Home extends Component {
  render() {
    const WIDTH = document.documentElement.clientWidth;
    return (
      <div
        style={{
          border: 'solid',
          borderRadius: 8,
          width: { WIDTH },
          margin: 10,
          padding: 5
        }}
      >
        <h2>Đồ án 2</h2>
        <h4>Nhận diện khuôn mặt qua video sử dụng{' '}
          <a href="https://github.com/justadudewhohacks/face-api.js">
            face-api.js
          </a>
        </h4>
        <img src={exampleImage} alt="example" width="550" />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            margin: 'auto',
            marginLeft: 10
          }}
        >
          <h3>Cách sử dụng</h3>
          <p>
          Ứng dụng này cố gắng phát hiện tất cả các khuôn mặt từ hình ảnh đầu vào và nhận ra nếu có bất kỳ khuôn mặt nào là người được nhập dữ trước đó.
          Tên nhân vật sẽ được hiển thị dưới hộp ở mặt của nhân vật nếu được tìm thấy. Chỉ các nhân vật được nhập dữ từ trước mới được ứng dụng này nhận ra.
          </p>
          <div>
            <ul>
              <h4>Yêu cầu:</h4>
              <li>
              Hỗ trợ mọi trình duyệt PC có bật Javascript (Chrome, IE, Safari)
              </li>
              <li>Hỗ trợ điện thoại Android để nhập ảnh và camera video</li>
              <li>Hỗ trợ Iphone trên Safari và Chrome chỉ dành cho Nhập ảnh</li>
              <li>Không hỗ trợ điện thoại thông minh cũ hơn (như Iphone4)</li>
            </ul>
            <ul>
              <h4>Đầu vào hình ảnh</h4>
              <li>Hình ảnh đầu vào có thể là tập tin hình ảnh hoặc URL</li>
              <li>Tệp hình ảnh phải là định dạng jpg, jpeg hoặc png</li>
              <li>
              Máy chủ URL hình ảnh phải cho phép các yêu cầu nguồn gốc chéo (CORS) nếu không Ứng dụng sẽ không thể truy cập hình ảnh. (bất kỳ hình ảnh facebook nào cũng tốt để thử nghiệm với Ứng dụng này)
              </li>
              <li>
              Ứng dụng sẽ cố gắng phát hiện tất cả các khuôn mặt, có thể mất vài giây tùy thuộc vào số lượng khuôn mặt trong hình ảnh.
              </li>
              <li>
              Nhận diện khuôn mặt có thể khó khăn nếu mặt đối tượng bị nghiêng, quá lớn hoặc quá nhỏ và / hoặc mặt mờ.
              </li>
              <li>
                The App might recognize member wrongly if their face look
                similar, or the object face does not look straight to camera.
              </li>
            </ul>
            <ul>
              <h4>Video Camera:</h4>
              <li>
              Đầu vào video hoạt động tốt với webcam PC hoặc máy ảnh Android điện thoại.
              </li>
              <li>
              Hiện tại camera Iphone không được hỗ trợ để phát hiện trực tiếp trong Ứng dụng này.
              </li>
              <li>
              Ứng dụng sẽ cố gắng phát hiện và nhận ra bất kỳ khuôn mặt nào, nhưng hiệu suất phụ thuộc vào CPU của thiết bị.
              </li>
              <li>
              Phát hiện và nhận dạng với webcam PC có thể nhanh, trong khi làm việc trên điện thoại thông minh có thể chậm hơn.
              </li>
            </ul>
            <ul>
              <h4>Tài liệu tham khảo:</h4>
              <li>
              Tìm thêm thông tin về code của tôi và API tại{' '}
                <a href="https://github.com/">
                  My Repo
                </a>
              </li>
              <li>
                face-api.js API{' '}
                <a href="https://github.com/justadudewhohacks/face-api.js">
                  repo
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
