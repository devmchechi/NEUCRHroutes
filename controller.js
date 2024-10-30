const User = require('./models/User');
const Organization = require('./models/Organization')

/* const endpoint = async (req, res) => {
    const { 
        parameter
    } = req.body;
    const leagues = [];

    let success = true;

    if(success)
    {
        res.status(200).json(parameter);
    }
    else
    {
        res.status(400).json({error: 'Invalid Password'});
    }
}; */

const create = async (req, res) => {
    const {
        username, 
        password
    } = req.body;
    try {
        const exists = await User.findOne({'username': username});
        if(exists)
        {
            res.status(400).json({error: 'Account Already Exists'});
        }
        else if(username.length === 0 || password.length === 0)
        {
            res.status(400).json({error: 'Invalid Username or Password'});
        }
        else
        {
            funds = 0;
            isReciever = false;
            finStatus = 0;
            const account = await User.create({
                username, 
                password,
                funds, 
                isReciever,
                finStatus
            });
        }
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const createOrg = async (req, res) => {
    const {
        name, 
        description
    } = req.body;
    try {
        const exists = await Organization.findOne({'username': name});
        if(exists)
        {
            res.status(400).json({error: 'Organization Already Exists'});
        }
        else
        {
            funds = 319824;
            const account = await Organization.create({
                name, 
                description,
                funds
            });
        }
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const verify = async (req, res) => {
    const {
        username, 
        password
    } = req.body;
    try {
        const user = await User.findOne({'username': username});
        if(user)
        {
            if(password === user.password)
            {
                res.status(200).json(user);
            }
            else
            {
                res.status(400).json({error: 'Invalid Password'});
            }
        }
        else
        {
            res.status(400).json({error: 'Account Does Not Exist'});
        }
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const addFunds = async (req, res) => {
    const {
        username, 
        amount
    } = req.body;
    try {
        const user = await User.findOne({'username': username});
        user.funds += amount;
        await user.save()
        res.status(200).json(user);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const addFundsOrg = async (req, res) => {
    const {
        username,
        amount, 
        organizationName
    } = req.body;
    try {
        const user = await User.findOne({'username': username});
        const organization = await Organization.findOne({'name': organizationName})
        console.log(user)
        console.log(organization)
        const funds = user.funds
        if ((funds - amount) < 0) {
            res.status(400).json({error: 'Insufficent Funds'});
        } else {
           user.funds -= amount;
           organization.funds += amount;
           await user.save()
           await organization.save()
           res.status(200).json(user);
           res.status(200).json(organization);
        }
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const makeReceiver = async (req, res) => { 
    const {
        username, 
        hispanicLatino, 
        sex, 
        income
    } = req.body;
    try {
        const user = await User.findOne({'username': username});
        if (!user.isReciever) {
            var sexIndex = 0;
            if ((sex.toLowerCase()).includes("male")) {
                sexIndex = 0.15
            } else if ((sex.toLowerCase()).includes("female")){
                sexIndex = 0.25
            }
            var hispanicIndex = 0;
            if (hispanicLatino) {
                hispanicIndex = 0.25
            } else {
                hispanicIndex = 0.15
            }
            var incomeIndex = 0;
            if (income <= 15000) {
                incomeIndex = 0.5
            } else if (income > 15000 && income <= 30000) {
                incomeIndex = 0.4
            } else if (income > 30000 && income <= 60000) {
                incomeIndex = 0.3
            } else if (income > 60000 && income <= 100000) {
                incomeIndex = 0.2
            } else if (income > 100000 && income <= 150000) {
                incomeIndex = 0.1
            }
            user.finStatus = incomeIndex + hispanicIndex + sexIndex;
            if (income > 150000) {
                user.finStatus = 0;
            }
            user.isReciever = true
            await user.save()
        } else {
            res.status(400).json({error: 'Already a Reciever'});
        }
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const giveToReceivers = async (req, res) => { 
    const { username, amount } = req.body;

    try {
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const user = await User.findOne({ "username": username });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const receivers = await User.find({ 'isReciever': true });

        if ((user.funds - amount) < 0) {
            return res.status(400).json({ error: 'Insufficient Funds' });
        }

        // Calculate the total `finStatus` sum
        let sum = receivers.reduce((acc, receiver) => acc + (receiver.finStatus || 0), 0);

        // If `sum` is zero, distribute equally
        if (sum === 0) {
            const equalShare = amount / receivers.length;

            for (let j = 0; j < receivers.length; j++) {
                receivers[j].funds += equalShare;
                await receivers[j].save();
            }
        } else {
            // Distribute based on `finStatus`
            for (let j = 0; j < receivers.length; j++) {
                const cut = (receivers[j].finStatus / sum) * amount;
                receivers[j].funds += cut;
                await receivers[j].save();
            }
        }

        user.funds -= amount;
        await user.save();

        res.status(200).json({ user, receivers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    //endpoint
    create,
    createOrg,
    verify, 
    addFunds,
    addFundsOrg, 
    makeReceiver,
    giveToReceivers
};