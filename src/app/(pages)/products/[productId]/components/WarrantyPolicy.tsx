export default function WarrantyPolicy() {
  return (
    <div className="comment tab-content space-y-5">
      <p className="font-semibold text-lg text-gray-800">
        Những sản phẩm được đổi khi đảm bảo các điều kiện sau:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Thời gian đổi sản phẩm trong vòng 03 ngày (từ ngày nhận hàng)</li>
        <li>Sản phẩm phải nguyên vẹn, còn nguyên tem mác</li>
        <li>Sản phẩm đổi phải ngang giá hoặc lớn hơn so với sản phẩm trả</li>
        <li>Tất cả chi phí phát sinh khi đổi trả khách hàng phải chịu</li>
      </ul>
      <p className="font-semibold text-gray-800">
        Những trường hợp được bảo hành miễn phí:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>
          Đối với quần âu, áo sơ mi cần sửa form dáng (lên gấu, bóp eo, v.v.)
        </li>
      </ul>
      <p className="font-semibold text-gray-800">
        Những trường hợp bảo hành có tính phí:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Sản phẩm bị rách, hỏng trong quá trình sử dụng cần sửa chữa</li>
      </ul>
    </div>
  );
}
