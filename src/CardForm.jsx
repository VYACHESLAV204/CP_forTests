import React, { useState } from 'react'

// Компонент формы для ввода данных карты
const CardForm = () => {
	const [cardData, setCardData] = useState({
		cardNumber: '2200 0000 2222 2222',
		expDateMonth: '12',
		expDateYear: '27',
		cvv: '911',
	})

	const [cryptogram, setCryptogram] = useState('')

	const handleChange = (e) => {
		const { name, value } = e.target
		setCardData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const generateCryptogram = () => {
		try {
			// Проверяем, что библиотека `cp` доступна
			if (typeof cp === 'undefined') {
				throw new Error('CloudPayments crypt.js не подключён.')
			}
			const checkout = new cp.Checkout({
				publicId: 'pk_5bd1a885126392fe9b3cc0394b2b0',
			})

			// Генерация криптограммы
			checkout
				.createPaymentCryptogram(cardData)
				.then((cryptogram) => {
					console.log(cryptogram)
					setCryptogram(cryptogram)
					alert('Криптограмма успешно сгенерирована!')
				})
				.catch((errors) => {
					console.log(errors)
				})
		} catch (error) {
			console.error('Ошибка генерации криптограммы:', error)
			alert('Ошибка генерации криптограммы. Проверьте данные.')
		}
	}

	return (
		<div>
			<h1>Данные карты</h1>
			<form>
				<div>
					<label>Номер карты:</label>
					<input
						type='text'
						name='cardNumber'
						value={cardData.cardNumber}
						onChange={handleChange}
						placeholder='4111111111111111'
					/>
				</div>
				<div>
					<label>Месяц (MM):</label>
					<input
						type='text'
						name='expDateMonth'
						value={cardData.expDateMonth}
						onChange={handleChange}
						placeholder='12'
					/>
				</div>
				<div>
					<label>Год (YY):</label>
					<input
						type='text'
						name='expDateYear'
						value={cardData.expDateYear}
						onChange={handleChange}
						placeholder='25'
					/>
				</div>
				<div>
					<label>CVV:</label>
					<input
						type='password'
						name='cvv'
						value={cardData.cvv}
						onChange={handleChange}
						placeholder='123'
					/>
				</div>
				<button type='button' onClick={generateCryptogram}>
					Сгенерировать криптограмму
				</button>
			</form>
			{cryptogram && (
				<div>
					<h2>Криптограмма:</h2>
					<p>{cryptogram}</p>
				</div>
			)}
		</div>
	)
}

export default CardForm
