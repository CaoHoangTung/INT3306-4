# Transfer docs 23/08/2021

## Author
`tungch`

`caohoangtung2001@gmail.com`

## Overview
VinBDI DGT Issues & Possible improvements

## Detail

### medius-db
- **(Issue) Không init được first user.**
	+ **Mô tả**: Chỉ khi access vào mysql docker container, chạy mysql -u vinbdi -p ... thì script init_data.py (trong medius-server) mới chạy thành công
	+ **Nguyên nhân**: Phiên bản mysql đang dùng hiện tại là 8.0, nên mặc định authentication plugin không phải là mysql_native_password
	+ **Hướng giải quyết**: Đã thử set command: ["mysqld", "--default-authentication-plugin=mysql_native_password"] trong docker-compose nhưng chưa được
<br>
- **(Possible improvment) Khởi tạo DB rất lâu trong docker**
	+ **Mô tả**: Việc khởi tạo medius-db container lần đầu tiên tốn khá nhiều thời gian (khoảng 5-10 phút từ lúc up docker cho tới lúc import toàn bộ cấu trúc db mẫu) 
	+ **Hướng giải quyết**: Chưa rõ?


- **(Possible improvement) Cách lưu status của các conversation**
	+ Mô tả: Hiện tại, status của các conversation trong field is_finished tương ứng đang là 0/1/2 (In progress, In review, Done). Đây là cách làm chưa tối ưu 
	+ Hướng giải quyết: Thêm field is_in_review trong database. Thay đổi các utility liên quan (dashboard stats, conversation list) sao cho phù hợp
	
### medius-server
- (Issue) Lỗi encoding khi chạy trong docker
	+ Mô tả: Lỗi charset encoding khi sử dụng api trong container medius-server. Các đầu api import dataa và hiển thị conversation gặp lỗi khi sử dụng ('charmap' codec can't encode character '\u1ecf' in position 1: character maps to <undefined>). Lưu ý lỗi này chỉ xuất hiện trong docker container
	+ Hướng giải quyết: Tìm cách thay đổi environment charset của docker container
	
	 
- (Issue) Conversation matching service logic
	+ Mô tả: Logic hiện tại đang là lấy random conversation chưa được assign -> update field 'active_user'. Điều này có thể gây ra conflict trong trường hợp có nhiều user cùng access vào một lúc
	+ Hướng giải quyết: Thay vì tách ra làm 2 công đoạn lấy conversation chưa assign -> update field active_user thì gộp lại trong 1 sql query lớn hơn?

medius-frontend
- (Possible improvement) CRUD trực tiếp category thay vì phải import qua tool
	+ Mô tả: Hiện tại trang category mới view được, chưa có thêm/sửa/xóa

- (Possible improvement) Import data
	+ Mô tả: Hiện tại việc import data được thực hiện trên client side. Browser JS đọc nội dung của JS file rồi sử dụng category/conversation service của API import
	+ Hướng giải quyết: Move việc đọc file lên server vả xử lý theo kiểu batch import vào mysql
	

## How to run
Cho tới phiên bản gần nhất (ngày 23/08/2021), để chạy được app, cần thực hiện các bước sau

**1. Khởi tạo db container và frontend container**
```
docker-compose -f docker-compose.dev.yml up --build --scale medius-server=0
```

**2. Access vào mysql trong db container để có thể chạy được script init dữ liệu**
- Chờ khoảng 5-7p để container `medius-db` khởi tạo xong (báo là ready for connections)
- Access vào docker container của database
```
docker exec -it [CONTAINER_ID] bash
mysql -u vinbdi -p
Enter password: Vinbdi@2021
```

**3. Chạy service server**
- Do docker server đang gặp lỗi encoding (như đã mô tả ở trên), chạy service bằng uvicorn
- Tải thư viện  (`python 3.8`)
```
cd medius-server && pip install -r requirements.txt 
```

- Chạy script init first user cho app
```
python init_data.py
```

- Chạy server
```
uvicorn main:app
```


- Truy cập vào app tại http://localhost:3000
- API endpoint được chạy tại http://localhost:8000
- API Swagger docs http://localhost:8000/docs
- App credential
    + Username: vinbdi
    + Password: Vinbdi@2021