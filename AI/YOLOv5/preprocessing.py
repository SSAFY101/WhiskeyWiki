import os

# 폴더 경로 설정
# folder_path = r'C:\Users\SSAFY\Desktop\ML\yolo_practice\YOLOv5\data\2-dataset\WhiskeyDataset2\train\test'

# folder_path = r''
# folder_path = r'C:\Users\SSAFY\Desktop\ML\yolo_practice\YOLOv5\data\2-dataset\WhiskeyDataset2\train\labels'
folder_path = r'C:\Users\SSAFY\Desktop\ML\yolo_practice\YOLOv5\data\2-dataset\WhiskeyDataset2\valid\labels'

# 폴더 안에 있는 모든 txt 파일 경로 가져오기
file_paths = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if f.endswith('.txt')]

for file_path in file_paths:
    # 파일 열기
    with open(file_path, 'r') as f:
        content = f.readlines()

    # 수정할 내용 변경하기
    if content:
        for i in range(len(content)):
            number = content[i].split()
            number[0] = str(int(number[0])+63)
            content[i] = ' '.join(number)+'\n'

    # 변경된 내용으로 파일 쓰기
    with open(file_path, 'w') as f:
        f.writelines(content)