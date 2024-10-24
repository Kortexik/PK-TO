import requests
import json
from abc import ABC, abstractmethod

class Currency:
    def __init__(self, code:str, name:str, rate:float) -> None:
        self.code = code
        self.name = name
        self.rate = rate
    
    def get_code(self) -> str:
        return self.code

    def set_code(self, new_code:str) -> None:
        self.code = new_code

    def get_name(self) -> str:
        return self.name

    def set_name(self, new_name:str) -> None:
        self.name = new_name

    def get_rate(self) -> float:
        return self.rate

    def set_rate(self, new_rate:float) -> None:
        self.rate = new_rate

    def __eq__(self, __o: object) -> bool:
        return self.code == __o.code and self.name == __o.name and self.rate == __o.rate

    def __str__(self) -> str:
        return f'Code: {self.code}\nName: {self.name}\nRate: {self.rate}'


class InterfaceCurrencyCollection(ABC):

    @abstractmethod
    def add(self, curr:Currency):
        ...

    @abstractmethod
    def get(self, searched_code):
        ...
        
    @abstractmethod
    def remove(self, index:int):
        ...

    @abstractmethod
    def update(self, index_to_update:int, new_code:str, new_name:str, new_rate:float):
        ...



class CurrencyCollection(InterfaceCurrencyCollection):
    def __init__(self) -> None:
        self.currency_col: list[Currency] = []

    def add(self, curr:Currency) -> None:
        self.currency_col.append(curr)

    def get(self, searched_code) -> Currency:
        for currency in self.currency_col:
            if currency.code == searched_code:
                return currency

    def remove(self, index:int) -> None:
        self.currency_col.pop(index)

    def update(self, index_to_update:int, new_code:str, new_name:str, new_rate:float) -> None:
        self.currency_col[index_to_update] = Currency(new_code, new_name, new_rate)

    def codesList(self) -> list[str]:
        return [currency.code for currency in self.currency_col]

    def __str__(self) -> str:
        base = ''
        for i in self.currency_col:
            base += (str(i) + "\n")
        return base

class Exchanger:
    def exchange(curr1:Currency, curr2:Currency, how_much: float) -> float:
        return round((curr1.get_rate() / curr2.get_rate() * how_much), 2)
        

class XMLParser:
    def __init__(self, url: str, string_charset: str) -> None:
        self.url = url
        self.string_charset = string_charset

    def parse(self) -> CurrencyCollection:
        data_string = Encoder.encode(DataProvider.get(self.url), self.string_charset)
        data = json.loads(data_string)

        currency_col = CurrencyCollection()
        for rate in data[0]['rates']:
            name = rate['currency']
            code = rate['code']
            mid = rate['mid']
            currency_col.add(Currency(code, name, mid))
        return currency_col
        
        
class Encoder:
    def encode(byte: bytes, string_charset: str) -> str:
        return byte.decode(string_charset)

class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

class DataProvider(metaclass=Singleton):
    def get(url) -> bytes:
        r = requests.get(url).content
        return r

class UI:
    def loop(codesList) -> list:
        print('Dostepne waluty:')
        for currencyCode in codesList:
            print(currencyCode)
        while True:
            while True:
                firstCode = input("Please provide the currency that you want to convert from using its three-letter code: \n").upper()
                if firstCode not in codesList:
                    print(f"{firstCode} is not a supported currency.")
                elif firstCode.isalpha() and len(firstCode) == 3:
                    break
                else:
                    print("Invalid input! Please enter a three-letter alphabetical currency code.")

            while True:
                secondCode = input(f"Please provide the currency that you want to convert to from {firstCode} using its three-letter code: \n").upper()
                if secondCode not in codesList:
                    print(f"{secondCode} is not a supported currency.")
                elif secondCode.isalpha() and len(secondCode) == 3:
                    break
                else:
                    print("Invalid input! Please enter a three-letter alphabetical currency code.")
            
            while True:
                try:
                    how_much = float(input(f"How much of {firstCode} do you want to convert?\n"))
                    break
                except ValueError:
                    print("Invalid input! Please enter a valid number for the amount.")
            
            return [firstCode, secondCode, how_much]



class Main:
    def main() -> None:
        parser = XMLParser('https://api.nbp.pl/api/exchangerates/tables/a/', 'UTF-8')
        currency_collection = parser.parse()
        currency_collection.add(Currency('PLN', "Polski Złoty", 1.0))
        codesList = currency_collection.codesList()

        ui = UI.loop(codesList)

        currency_1 = currency_collection.get(ui[0])
        currency_2 = currency_collection.get(ui[1])
        amount = ui[2]

        exchanged = Exchanger.exchange(currency_1, currency_2, amount)
        print(f'{amount} {currency_1.code} is {exchanged} {currency_2.code}')

        
if __name__ == '__main__':
    Main.main()