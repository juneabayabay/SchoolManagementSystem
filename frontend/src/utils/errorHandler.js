export const handleApiError = (error) => {
    if (error.response) {
      return error.response.data || { detail: 'Server error' };
    }
    return { detail: 'Network error' };
  };