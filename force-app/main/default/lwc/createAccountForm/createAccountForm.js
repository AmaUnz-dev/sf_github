import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class CreateAccountForm extends LightningElement {
    @track accountName = '';
    @track phone = '';
    @track website = '';
    @track industry = '';
    @track isLoading = false;
    @track isSuccess = false;
    @track errorMessage = '';
    @track accountId = '';

    industryOptions = [
        { label: '-- None --', value: '' },
        { label: 'Agriculture', value: 'Agriculture' },
        { label: 'Banking', value: 'Banking' },
        { label: 'Construction', value: 'Construction' },
        { label: 'Education', value: 'Education' },
        { label: 'Finance', value: 'Finance' },
        { label: 'Healthcare', value: 'Healthcare' },
        { label: 'Manufacturing', value: 'Manufacturing' },
        { label: 'Retail', value: 'Retail' },
        { label: 'Technology', value: 'Technology' },
        { label: 'Transportation', value: 'Transportation' },
    ];

    handleNameChange(event) {
        this.accountName = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleWebsiteChange(event) {
        this.website = event.target.value;
    }

    handleIndustryChange(event) {
        this.industry = event.target.value;
    }

    handleCreate() {
        if (!this.accountName) {
            this.errorMessage = 'Account Name is required.';
            return;
        }

        this.isLoading = true;
        this.isSuccess = false;
        this.errorMessage = '';

        const fields = {
            [NAME_FIELD.fieldApiName]: this.accountName,
            [PHONE_FIELD.fieldApiName]: this.phone,
            [WEBSITE_FIELD.fieldApiName]: this.website,
            [INDUSTRY_FIELD.fieldApiName]: this.industry,
        };

        createRecord({ apiName: ACCOUNT_OBJECT.objectApiName, fields })
            .then(result => {
                this.accountId = result.id;
                this.isSuccess = true;
                this.handleReset();
            })
            .catch(error => {
                this.errorMessage = error.body?.message || 'An error occurred while creating the account.';
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    handleReset() {
        this.accountName = '';
        this.phone = '';
        this.website = '';
        this.industry = '';
        this.errorMessage = '';
    }
}
