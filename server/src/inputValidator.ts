function validateInput(question: string | undefined): { isValid: boolean; message: string } {
	// Validate input exists and is a string
	if (!question || typeof question !== 'string') {
		return { isValid: false, message: 'Question is required' };
	}

	// Validate input length
	if (question.length > 50) {
		return { isValid: false, message: 'Question exceeds maximum length' };
	}

	// Validate input is not empty
	if (question.trim() === '') {
		return { isValid: false, message: 'Question cannot be empty' };
	}

	return { isValid: true, message: 'Question is valid' };
}

export { validateInput };
