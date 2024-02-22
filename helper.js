class Helper{
    static formatPrice(value){
        let currency = new Intl.NumberFormat("id-ID", {
            currency: "IDR",
            style: "currency"
          })
          return currency.format(value)
    }
};

module.exports = Helper