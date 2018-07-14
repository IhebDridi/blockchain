const SHA256 = require ("crypto-js/sha256")

class block
{
    constructor (index, timestamp, data, previoushash = ""){                            //the construction of the Block object
        this.index=index;                                                               
        this.timestamp=timestamp;
        this.data=data;
        this.previoushash=previoushash;
        this.hash=this.calculateHash();                                                 //the hash of the block will be calculated 
        this.numberOfTries=0;                                                           //this variable will be used to mine
        
    }
    calculateHash(){
        return SHA256(this.numberOfTries+this.index+this.previoushash+this.timestamp+JSON.stringify(this.data)).toString(); //creating the new hash using all of the data in the block
    }
    mineBlock(difficulty)
    {
        while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join("0"))    //if the numbers from 0 to *var* equals isnt equal to *var* zeroes (example: we need the first 4 caracters equal to 0)
        {
            this.numberOfTries++;                                                           //by changing this variable we change the calculated hash in the next try (ps.if this variable doesnt exist it will be an endless loop because the calculated hash will be the same)
            this.hash=this.calculateHash();

        }
        console.log("block mined :" +this.hash);                                    //test
    }
}
    class blockChain
{
        constructor()
        {
            this.chain = [this.createGenesisBlock()];                               //putting the genesis block as the first block in the chain
            this.difficulty =4;                                                     //the difficulty for miners(ps.DO NOT INCREASE MORE THAN 5)
        }
        createGenesisBlock(){                                                       //a simple function for the creation of the genesis block
            return new block (0,"01/01/01","genesisblock","0");
        }
        getLatestBlock(){                                                           //a function used to get the last block in the chain used for the creation of the new blocks
            return this.chain[this.chain.length-1];
        }
        addBlock(newblock){                                                         //the creation of the new block using the miners
            newblock.previoushash =this.getLatestBlock().hash;                      //the previous hash is uncluded in the creation of the new hash
            newblock.mineBlock(this.difficulty);                                    //changing the hash until it reaches the difficulty requirement
            this.chain.push(newblock);                                              //putting the new block into the chain
        }
        /*addBlock(newblock){                                                         //the creation of the new block without miners
            newblock.previoushash =this.getLatestBlock().hash;                      
            newblock.hash=newblock.calculateHash();                                  //creation of the hash once
            this.chain.push(newblock);   */                                           

        
        isChainValid()                                                              //the validity of the chain
        {
            for(let i=1;i<this.chain.length;i++)                                    //testing all the blocks
            {
                const currentblock =this.chain[i];                                  
                const previousBlock = this.chain[i-1];
                if(currentblock.hash!==currentblock.calculateHash())                //testing if the hash is right (as in the block data is right)
                {
                    return false;
                }
                if(currentblock.previoushash!==previousBlock.hash)                  //testing the bond of the blocks
                {
                    return false;
                }
                else
                {
                    return true;
                }
             }
        }
}
let hcv = new blockChain;                                                           //the creation of the chain
console.log("mining block 1 ...");                                                  //testing the miners
hcv.addBlock(new block(1,"10/07/2017",{amount:4}));
console.log("mining block 2 ...");
hcv.addBlock(new block(2,"12/07/2017",{amount:10}));
//console.log(JSON.stringify(hcv, null, 4));                                          //the chain


/*console.log("the validity of the chain : "+hcv.isChainValid());                   //testing the validity
hcv.chain[1].data={data:100};
console.log("the validity of the chain : "+hcv.isChainValid());*/
/*DO NOT INCREASE THE DIFFICULTY MORE THAN 5
DO NOT INCREASE THE DIFFICULTY MORE THAN 5
DO NOT INCREASE THE DIFFICULTY MORE THAN 5
DO NOT INCREASE THE DIFFICULTY MORE THAN 5
DO NOT INCREASE THE DIFFICULTY MORE THAN 5*/