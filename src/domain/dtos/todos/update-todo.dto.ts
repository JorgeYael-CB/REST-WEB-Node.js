


export class UpdadteDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}


    get values(){
        const returnObj: {[key: string]: any} = {};

        if( this.text ) returnObj.text = this.text;
        if( this.completedAt ) returnObj.completedAt = this.completedAt;

        return returnObj;
    }


    static create( props: {[key: string]: any} ):[string?, UpdadteDto?] {
        const {id, text, completedAt} = props;
        let newCompletedAt = completedAt;

        if( !id || isNaN(id) ) ['id must be a valid number'];

        if( completedAt ){
            newCompletedAt = new Date( newCompletedAt );

            if( newCompletedAt.toString() === 'Invalid Date' ){
                return ['Completed At must be a valid date', undefined];
            }
        };


        return [undefined, new UpdadteDto(id, text, completedAt)];
    }

}

