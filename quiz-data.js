// Quiz data - 50 câu hỏi lịch sử Việt Nam 1951-1954

const QUIZ_DATA = [
    {
        question: "Năm 1951, cuộc kháng chiến chống Pháp của Việt Nam bước sang năm thứ mấy?",
        options: ["Năm thứ 3", "Năm thứ 4", "Năm thứ 5", "Năm thứ 6"],
        correct: 2 // Index 2 = "Năm thứ 5"
    },
    {
        question: "Sau năm 1949, nước nào đã tạo điều kiện hỗ trợ Việt Nam trong kháng chiến?",
        options: ["Liên Xô", "Trung Quốc", "Triều Tiên", "Đông Đức"],
        correct: 1
    },
    {
        question: "Năm 1951, Pháp nhận được sự viện trợ chủ yếu từ nước nào?",
        options: ["Anh", "Nhật Bản", "Mỹ", "Liên Xô"],
        correct: 2
    },
    {
        question: "Kế hoạch \"đánh nhanh thắng nhanh\" của Pháp năm 1950-1951 mang tên tướng nào?",
        options: ["Navarre", "Đờ Lát Đơ Tát-xi-nhi (De Lattre)", "Đờ Cát-tri (De Castries)", "Sa-lan (Salan)"],
        correct: 1
    },
    {
        question: "Tình hình quốc tế đầu thập niên 1950 diễn ra cuộc đối đầu nào?",
        options: ["Thế chiến thứ hai", "Chiến tranh lạnh", "Chiến tranh Triều Tiên", "Chiến tranh thương mại"],
        correct: 1
    },
    {
        question: "Đại hội Đại biểu toàn quốc lần thứ II của Đảng diễn ra khi nào?",
        options: ["Tháng 1/1951", "Tháng 2/1951", "Tháng 3/1951", "Tháng 12/1950"],
        correct: 1
    },
    {
        question: "Đại hội Đảng lần thứ II đã xác định hai nhiệm vụ chính là gì?",
        options: ["Kháng chiến và cải cách ruộng đất", "Kháng chiến và kiến quốc", "Kiến quốc và công nghiệp hóa", "Đoàn kết và kháng chiến"],
        correct: 1
    },
    {
        question: "Đường lối kháng chiến được Đại hội II xác định là:",
        options: ["Kháng chiến ngắn hạn, đánh nhanh thắng nhanh", "Kháng chiến trường kỳ, phòng thủ chủ động", "Kháng chiến trường kỳ, tiến công địch về mọi mặt", "Kháng chiến du kích, kéo dài thời gian"],
        correct: 2
    },
    {
        question: "Đại hội II thành lập tổ chức nào để thay thế Mặt trận Việt Minh?",
        options: ["Mặt trận Dân tộc Thống nhất", "Mặt trận Liên Việt", "Mặt trận Tổ quốc", "Mặt trận Dân chủ Nhân dân"],
        correct: 1
    },
    {
        question: "Đại hội Đảng lần II đã tổng kết bao nhiêu năm kháng chiến?",
        options: ["3 năm", "4 năm", "5 năm", "6 năm"],
        correct: 2
    },
    {
        question: "Mục tiêu chính của việc thành lập Mặt trận Liên Việt là:",
        options: ["Thay thế chính phủ", "Mở rộng đoàn kết dân tộc", "Cải cách hành chính", "Tổ chức bầu cử"],
        correct: 1
    },
    {
        question: "Đại hội II xác định con đường phát triển của Việt Nam là:",
        options: ["Tư bản chủ nghĩa", "Xã hội chủ nghĩa", "Độc lập dân tộc gắn liền với chủ nghĩa xã hội", "Kinh tế thị trường"],
        correct: 2
    },
    {
        question: "Phương châm tác chiến mới từ năm 1951 là:",
        options: ["Vừa đánh vừa đi", "Đánh địch tiến công, diệt sinh lực địch", "Địch tiến ta lùi, địch lùi ta tiến", "Đánh nhanh thắng nhanh"],
        correct: 1
    },
    {
        question: "Từ năm 1951, ta chuyển từ hình thức tác chiến nào sang hình thức nào?",
        options: ["Từ phòng thủ sang tiến công", "Từ chiến tranh chính quy sang du kích chiến", "Từ du kích chiến sang đánh địch tiến công", "Từ tiến công sang phòng thủ"],
        correct: 2
    },
    {
        question: "Phương châm tác chiến mới kết hợp hai hình thức chiến tranh nào?",
        options: ["Chiến tranh biển và chiến tranh bộ", "Chiến tranh du kích và chiến tranh chính quy", "Chiến tranh vận động và chiến tranh trận địa", "Chiến tranh tâm lý và chiến tranh vũ trang"],
        correct: 1
    },
    {
        question: "Chiến dịch nào được coi là tiền đề cho giai đoạn mới (1951-1954)?",
        options: ["Chiến dịch Biên giới Thu - Đông 1950", "Chiến dịch Hòa Bình", "Chiến dịch Tây Bắc", "Chiến dịch Thượng Lào"],
        correct: 0
    },
    {
        question: "Ý nghĩa chính của chiến thắng Biên giới Thu - Đông 1950 là:",
        options: ["Giải phóng hoàn toàn miền Bắc", "Tiêu diệt toàn bộ quân Pháp", "Giải phóng biên giới Việt-Trung, mở đường giao lưu với các nước XHCN", "Kết thúc cuộc kháng chiến"],
        correct: 2
    },
    {
        question: "Chiến thắng Hòa Bình diễn ra trong thời gian nào?",
        options: ["1950-1951", "1951-1952", "1952-1953", "1953-1954"],
        correct: 1
    },
    {
        question: "Chiến thắng Hòa Bình đã đập tan âm mưu gì của Pháp?",
        options: ["Chiếm Hà Nội", "Đánh chiếm Tây Bắc", "Tấn công căn cứ Việt Bắc", "Chiếm đồng bằng Bắc Bộ"],
        correct: 1
    },
    {
        question: "Sau thất bại tại Hòa Bình, tướng Pháp nào phải từ chức?",
        options: ["Navarre", "Đờ Cát-tri", "Đờ Lát (De Lattre)", "Sa-lan"],
        correct: 2
    },
    {
        question: "Vùng Hòa Bình có vị trí chiến lược ntn đối với kháng chiến?",
        options: ["Cửa ngõ vào Hà Nội", "Cửa ngõ vào Tây Bắc và vùng căn cứ kháng chiến", "Trung tâm kinh tế miền Bắc", "Nơi đóng quân chủ lực của Pháp"],
        correct: 1
    },
    {
        question: "Kết quả chính của chiến thắng Hòa Bình là:",
        options: ["Giải phóng hoàn toàn vùng Hòa Bình", "Tiêu diệt nhiều sinh lực địch, buộc Đờ Lát từ chức", "Kết thúc kế hoạch Navarre", "Mở đầu cho Điện Biên Phủ"],
        correct: 1
    },
    {
        question: "Chiến dịch Tây Bắc diễn ra khi nào?",
        options: ["1950-1951", "1951-1952", "1952-1953", "1953-1954"],
        correct: 2
    },
    {
        question: "Mục tiêu chính của chiến dịch Tây Bắc là:",
        options: ["Tiêu diệt quân đội Pháp", "Giải phóng vùng Tây Bắc, mở rộng căn cứ kháng chiến", "Hỗ trợ Lào kháng chiến", "Chuẩn bị cho Điện Biên Phủ"],
        correct: 1
    },
    {
        question: "Chiến dịch Tây Bắc đã phá vỡ kế hoạch nào của Pháp?",
        options: ["Kế hoạch Đờ Lát", "Kế hoạch Navarre", "Kế hoạch Sa-lan", "Kế hoạch Đờ Cát-tri"],
        correct: 1
    },
    {
        question: "Ý nghĩa của việc giải phóng Tây Bắc đối với kháng chiến là:",
        options: ["Kết thúc kháng chiến", "Mở rộng vùng căn cứ, tạo điều kiện cho các chiến dịch tiếp theo", "Chiếm đồng bằng Bắc Bộ", "Giải phóng Hà Nội"],
        correct: 1
    },
    {
        question: "Vùng Tây Bắc có đặc điểm địa hình như thế nào?",
        options: ["Đồng bằng rộng lớn", "Vùng núi hiểm trở, có nhiều dân tộc thiểu số", "Vùng ven biển", "Vùng đồi núi thấp"],
        correct: 1
    },
    {
        question: "Chiến dịch Thượng Lào diễn ra khi nào?",
        options: ["1951-1952", "1952-1953", "1953-1954", "1954-1955"],
        correct: 2
    },
    {
        question: "Mục đích của chiến dịch Thượng Lào là:",
        options: ["Giải phóng Lào hoàn toàn", "Hỗ trợ kháng chiến Lào, kéo dài chiến tuyến địch", "Chiếm thủ đô Lào", "Tiêu diệt quân Pháp tại Lào"],
        correct: 1
    },
    {
        question: "Chiến dịch Thượng Lào tạo điều kiện thuận lợi cho chiến dịch nào?",
        options: ["Chiến dịch Hòa Bình", "Chiến dịch Tây Bắc", "Chiến dịch Điện Biên Phủ", "Chiến dịch Biên giới"],
        correct: 2
    },
    {
        question: "Chiến dịch Thượng Lào thể hiện tinh thần gì?",
        options: ["Tự lực cánh sinh", "Chủ nghĩa quốc tế trong sáng, đoàn kết Đông Dương", "Độc lập tự chủ", "Kháng chiến trường kỳ"],
        correct: 1
    },
    {
        question: "Kế hoạch Navarre được Pháp thực hiện từ năm nào?",
        options: ["1951", "1952", "1953", "1954"],
        correct: 2
    },
    {
        question: "Pháp biến Điện Biên Phủ thành gì theo kế hoạch Navarre?",
        options: ["Thủ đô mới", "\"Căn cứ đắc lực\" (tập đoàn cứ điểm)", "Trung tâm hành chính", "Căn cứ hải quân"],
        correct: 1
    },
    {
        question: "Mục tiêu chính của Pháp khi chiếm giữ Điện Biên Phủ là:",
        options: ["Xây dựng sân bay", "Ngăn chặn ta tiến về Thượng Lào, tìm cơ hội đánh úp căn cứ ta", "Kiểm soát biên giới", "Thành lập chính quyền mới"],
        correct: 1
    },
    {
        question: "Bộ Chính trị Đảng quyết định mở chiến dịch Điện Biên Phủ khi nào?",
        options: ["Tháng 10/1953", "Tháng 11/1953", "Tháng 12/1953", "Tháng 1/1954"],
        correct: 2
    },
    {
        question: "Phương châm tác chiến tại Điện Biên Phủ là:",
        options: ["Đánh nhanh thắng nhanh", "Đánh chắc thắng, tiến chắc", "Vừa đánh vừa đi", "Tiến công toàn diện"],
        correct: 1
    },
    {
        question: "Ba loại lực lượng chính tham gia chiến dịch Điện Biên Phủ là:",
        options: ["Bộ binh, pháo binh, công binh", "Bộ đội chủ lực, dân công hỏa tuyến, lực lượng hậu phương", "Quân chính quy, quân địa phương, dân quân", "Lục quân, hải quân, không quân"],
        correct: 1
    },
    {
        question: "Chiến dịch Điện Biên Phủ diễn ra từ ngày nào đến ngày nào?",
        options: ["13/2/1954 - 7/5/1954", "13/3/1954 - 7/5/1954", "13/3/1954 - 7/6/1954", "13/4/1954 - 7/5/1954"],
        correct: 1
    },
    {
        question: "Chiến dịch Điện Biên Phủ kéo dài bao nhiêu ngày đêm?",
        options: ["46 ngày đêm", "56 ngày đêm", "66 ngày đêm", "76 ngày đêm"],
        correct: 1
    },
    {
        question: "Mục tiêu của giai đoạn 1 chiến dịch Điện Biên Phủ là:",
        options: ["Tiêu diệt toàn bộ địch", "Tiến công diệt các cứ điểm ngoài", "Bao vây địch", "Tổng tiến công"],
        correct: 1
    },
    {
        question: "Giai đoạn 2 của chiến dịch có nhiệm vụ:",
        options: ["Tiến công nhanh", "Rút lui chiến lược", "Bao vây, cô lập, chia cắt các cứ điểm trong lòng chảo", "Phòng thủ trận địa"],
        correct: 2
    },
    {
        question: "Tổng chỉ huy quân đội Pháp tại Điện Biên Phủ là ai?",
        options: ["Navarre", "Đờ Lát", "Đờ Cát-tri (De Castries)", "Sa-lan"],
        correct: 2
    },
    {
        question: "Kết quả của chiến dịch Điện Biên Phủ là:",
        options: ["Pháp rút lui có tổ chức", "Tiêu diệt một phần quân Pháp", "Tiêu diệt toàn bộ tập đoàn cứ điểm, bắt sống Đờ Cát-tri và bộ chỉ huy", "Giải phóng một phần Điện Biên Phủ"],
        correct: 2
    },
    {
        question: "Hội nghị Giơnevơ bắt đầu diễn ra từ tháng mấy năm 1954?",
        options: ["Tháng 3/1954", "Tháng 4/1954", "Tháng 5/1954", "Tháng 6/1954"],
        correct: 2
    },
    {
        question: "Hiệp định Giơnevơ về Đông Dương được ký kết ngày nào?",
        options: ["7/5/1954", "20/7/1954", "21/7/1954", "2/9/1954"],
        correct: 2
    },
    {
        question: "Hiệp định Giơnevơ tạm phân chia Việt Nam ở vĩ tuyến nào?",
        options: ["Vĩ tuyến 16", "Vĩ tuyến 17", "Vĩ tuyến 18", "Vĩ tuyến 19"],
        correct: 1
    },
    {
        question: "Theo Hiệp định Giơnevơ, tổng tuyển cử thống nhất đất nước sẽ được tổ chức sau:",
        options: ["1 năm (tháng 7/1955)", "2 năm (tháng 7/1956)", "3 năm (tháng 7/1957)", "5 năm (tháng 7/1959)"],
        correct: 1
    },
    {
        question: "Chiến thắng kháng chiến chống Pháp đã kết thúc bao nhiêu năm đô hộ của thực dân Pháp tại Việt Nam?",
        options: ["60 năm", "70 năm", "80 năm", "90 năm"],
        correct: 2
    },
    {
        question: "Ba mũi giáp công trong chiến tranh nhân dân bao gồm:",
        options: ["Quân sự, kinh tế, văn hóa", "Quân sự, chính trị, binh vận", "Chính trị, kinh tế, xã hội", "Ngoại giao, quân sự, kinh tế"],
        correct: 1
    },
    {
        question: "Đường lối kháng chiến của Đảng được xác định là:",
        options: ["Kháng chiến ngắn hạn", "Kháng chiến du kích", "Kháng chiến trường kỳ, chiến tranh nhân dân toàn diện", "Kháng chiến chính quy"],
        correct: 2
    }
];
