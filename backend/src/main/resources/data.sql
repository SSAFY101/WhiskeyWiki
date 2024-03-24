INSERT INTO users (login_id, password, nickname, address, gender, age, refresh_token, latitude, longitude)
values
('1234', '1234', '닉네임1', '도로명주소1 삼성화재 연수원', '남성', 20, 'refresh token1', 36.355359, 127.298385),
('ssafy', '1234', '닉네임2', '도로명주소2 삼성화재 연수원', '여성', 21, 'refresh token2', 36.355212, 127.298924),
('ssafy1', '1234', '닉네임3', '도로명주소3 한밭대 운동장', '여성', 22, 'refresh token3', 36.353544, 127.301025),
('ssafy2', '1234', '닉네임4', '도로명주소4 한밭대 정문', '남성', 30, 'refresh token3', 36.350993, 127.298499);

INSERT INTO whiskey (whiskey_name_kr, whiskey_name_en, whiskey_flavor, abv, price, detail)
values ('앱솔루트', 'Abolute', 'NONE FLAVOR', 40, 35000, '앱솔루트 보드카’는 스웨덴의 400년 양조 전통이 낳은 최고의 산물로, 남부 아후스(Ahus) 지방에서 생산된 역사적인 보드카이다. ‘앱솔루트’는 천연재료로만 만들었으며, 설탕이 전혀 포함되지 않은 특유의 부드러움을 가지고 있는 제품이다.'),
('잭다니엘', 'Jack Daniels', 'FRUITY & VANILLA', 40, 58000, '잭 다니엘 위스키는 테네시 주 프랭클린에서 생산되는 아메리칸 위스키로, 캐스크 에이징 과정을 거친다. 콘스탄스 벨 화이트, 소프트 초콜릿 맛, 그리고 고소한 휘핑 크림 향이 특징이다. 위스키의 명성은 그 특유의 부드러움과 풍미 때문에 세계적으로 알려져 있다.'),
('짐빔', 'Jim Beam', 'SWEET & FRUITY',43, 50000, '짐빔은 보편적으로 버번(버번 주 정통 위스키)의 조제 방식을 사용하여 만들어지며, 오크 배럴에서 여러 해 동안 숙성되어 특유의 부드럽고 깊은 맛을 내뿜는다. 이 위스키는 고소한 곡물 향과 바닐라 풍미를 가지고 있으며, 쉽게 접근 가능하면서도 풍부한 맛을 제공하여 많은 위스키 팬들에게 사랑받고 있다.'),
('깔루아', 'Kahlúa', 'SWEET & COFFEE', 16, 39000,'더 앱솔루트 컴퍼니의 등록상표이자, 멕시코의 베라크루스 지역에서 생산되는 커피리큐어');

INSERT INTO own_whiskey(user_id, whiskey_id, is_empty)
values (1, 1, 1),
(1, 2, 1),
(1, 3, 2),
(2, 1, 1),
(3, 1, 1),
(3, 2, 1),
(3, 3, 1);

INSERT INTO cocktail(cocktail_name, reciepe, detail)
values
('짐빔 하이볼', '토닉워터를 4, 짐빔을 1 의 비율로 얼음과 함께 섞어준다.', '달달한 맛을 베이스로 레몬향과 자몽향이 풍부하게 나는 것이 특징인 칵테일입니다.'),
('잭콕', '잔에 얼음을 3/4 채우고, 얼음위에 잭다니엘 60ml과 콜라를 붓는다.', '잭다니엘의 강한 바닐라 풍미와 콜라의 진한 카라멜 맛이 완벽하게 어우러지는 칵테일입니다.'),
('잭 하이볼', '잔에 얼은을 3/4 채우고 얼음위에 잭다니엘 60mlw를 붓는다. 탄산수를 잔 끝까지 부어 잘 섞어준다.', '잭다니엘의 풍미를 살리면서 청량감을 느낄 수 있는 칵테일입니다.'),
('잭앤 진저', '잔에 얼은을 3/4 채우고 얼음위에 잭다니엘 60ml를 붓는다. 진저에일을 잔 끝까지 부어 잘 섞어준다.', '잭다니엘에 생강의 풍미롸 탄산을 가진 진저에일을 더해 독특한 아로마를 즐길 수 있는 칵테일입니다.'),
('잭 인 블랙', '잔에 얼음을 3/4 채우고 얼음위에 잭다니엘 45ml를 붓는다. 깔루아를 22ml와 콜라를 부어 잘 섞어준다.', '잭다니엘의 강한 바닐라 풍미와 콜라의 카라멜 맛이 완벽하게 페어리 된 잭콕에 커피 리큐어를 추가하여 단맛의 균형이 이루어진 새로운 칵테일입니다.');

INSERT INTO favorite(user_id, cocktail_id)
values (1,1), (1,2), (1,3), (1,4);

INSERT INTO base(whiskey_id, cocktail_id)
values (3, 1), (2, 2), (2,3), (2,4), (2,5), (4,5);

INSERT INTO ingredient(name)
values ('토닉워터'), ('콜라'), ('진저에일');

INSERT INTO cocktail_ingredient(cocktail_id, ingredient_id)
values (1,1), (2,2), (3,1), (4,3), (5,2);

INSERT INTO favorite(user_id, cocktail_id)
values (1,1),(1,2),(1,4),(2,3),(2,4),(3,5);

-- INSERT INTO review(whiskey_id, user_id, review_rating, content)
-- values (3,1,5,'너무 맛있어요'), (3,2,4,'역시 짐빔이 짱이지'), (3,3,5,'짐빔 칵테일이 진짜 맛있지');